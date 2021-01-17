from model import db_connection
from helper import id_generator,paginated_results
from controllers import availability
from flask import request
from datetime import time
import datetime
import copy

avail = availability.Availabilty()
class Booking:
    def __init__(self):
        self.db=db_connection.Database()

    def record_exists(self,field,data):
        count = self.db.get_doc_count("bookings",{field:data})
        if count:
            return True
        return False
        
    def generate_id(self):
        id = id_generator.ran_gen()
        while True:
            if self.record_exists("booking_id",id):
                id = id_generator.ran_gen()
            else:
                return id

    def book_ticket(self,input):
        output ={"status": "" , "message" : ""}
        try:
            body = input['body']
            user_id = input['user_id']
            movie_id = body['movie_id']
            date = body['date']
            time = body['time']
            seats = body['seats']

            out= avail.check_availability()

            if out['available_seats'] < seats:
                output['message'] = 'Only {} seats available'.format(out['available_seats'] )
                output["status"] = "error"


            elif seats > 10:
                output['message'] = "Maximum 10 tickets can be booked once"
                output["status"] = "error"


            else:
                show = 'show_timings.$.'+time
                filters = {
                         "movie_id":movie_id,
                         "show_timings":{"$elemMatch": {"date":date }}}
                         
                operation ={
                        "$inc": {show:  -seats}
                        }

                self.db.update_array_value("timings",filters,operation)

                movie_time = date + " " + time
 
                movie_time = datetime.datetime.strptime(movie_time, '%d-%m-%Y %I-%M%p')

                booking_details = {
                    "booking_id" : self.generate_id(),
                    "movie_id": movie_id,
                    "booked_on" : datetime.datetime.now(),
                    "show_time": movie_time,
                    "seats":seats,
                    "active": True
                }

                booking_id = booking_details['booking_id']

                self.db.insert_one_data('bookings',copy.copy(booking_details))
                self.db.insert_one_to_array('account_details',"user_id",user_id,"upcoming_movies",booking_id)


                

                output['booking_details'] = booking_details
                output["status"] = "success"

        except Exception as e:
            print(e)
            output["status"] = "error"
            output['message'] = str(e)

        return output


    def cancel_ticket(self,input):
        output ={"status": "" , "message" : ""}
        try:
            body = input['body']
            user_id = input['user_id']
            movie_id = body['movie_id']
            booking_id = body['booking_id']
           
            ticket =self.db.get_one_value('bookings',{"booking_id":booking_id,"active":True},[],["_id"])

            if not ticket:
                output["status"] = "error"
                output['message'] = "Ticket not found"
                return output

            date = ticket['show_time'].strftime('%d-%m-%Y')
            show_time = ticket['show_time'].strftime('%I-%M%p')
            seats = ticket['seats']

            if (datetime.datetime.now() + datetime.timedelta(hours=2)) > (ticket['show_time']-datetime.timedelta(hours=2)):
                output["status"] = "error"
                output['message'] = "You cannot cancel now"
            
            else:
                
                self.db.update_one("bookings","booking_id",booking_id,{"active":False})
               
                show = 'show_timings.$.'+show_time
                filters = {
                         "movie_id":movie_id,
                         "show_timings":{"$elemMatch": {"date":date }}
                         }

                operation ={
                        "$inc": {show:  seats}
                        }
                
                self.db.update_array_value("timings",filters,operation)
                self.db.delete_one_from_array('account_details',"user_id",user_id,"upcoming_movies",booking_id)
                self.db.insert_one_to_array('account_details',"user_id",user_id,"cancelled_movies",booking_id)

                output["status"] = ticket
                output['message'] = "status"


        except Exception as e:
            
            output["status"] = "error"
            output['message'] = str(e)

        return output
    
from model import db_connection
from helper import id_generator,paginated_results
from flask import request


class Availabilty:
    def __init__(self):
        self.db=db_connection.Database()

    def show_timings(self):
        output ={"status": "" , "message" : ""}

        try:
            input = request.get_json(force=True)
            body =input['body']
            movie_id = body['movie_id']
            print(input)
            
            timings = self.db.get_one_value('timings',
            {"movie_id":movie_id},[],["_id"])
            timings['show_timings'] = sorted(timings['show_timings'], key=lambda k: (k['date'])) 
            print(timings)
            for show_time in timings['show_timings']:
                keys = list(show_time.keys())
                keys.remove('date')
                show_time.update({"times":keys})

            output['timings'] = timings['show_timings']
            output["status"] = "success"

        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output

    def add_show_time(self,input):
        output ={"status": "" , "message" : ""}
        try:
            body =input['body']
            movie_id = body['movie_id']
            show_time = body['show_time']

            self.db.insert_one_to_array("timings","movie_id",movie_id,"show_timings",show_time)

            output["status"] = "success"

        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output

    def check_availability(self):
        output ={"status": "" , "message" : ""}

        try:
            input = request.get_json(force=True)
            body =input['body']
            movie_id = body['movie_id']
            date = body['date']
            time = body['time']
            # seat = body['seats']
            
            timings = self.db.aggregate("timings",date,movie_id)

            if timings:

                
                available_seats = timings[0]['_id'][time]

                output['available_seats'] = available_seats
                output["status"] = "success"

        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output  

    
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
            date = body['date']
            
            timings = self.db.get_one_value('timings',
            {"movie_id":movie_id,"show_timings":{"$elemMatch": {"date":date}}},[],["_id"])

            output['timings'] = timings
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
            seat = body['seats']
            
            timings = self.db.get_one_value('timings',
            {"movie_id":movie_id,"show_timings":{"$elemMatch": {"date":date}}},[],["_id"])

            available_seats = timings['show_timings'][0][time]

            output['available_seats'] = available_seats
            output["status"] = "success"

        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output  

    
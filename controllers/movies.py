from model import db_connection
from helper import id_generator,paginated_results
from flask import request


class Movies:
    def __init__(self):
        self.db=db_connection.Database()

    def list_movies(self):
        output ={"status": "" , "message" : ""}
        try:
            movies = self.db.get_values('movies',{"running":True},[],["_id"])
            output['movies'] = movies
            output["status"] = "success"

        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output

    def movie_details(self):
        output ={"status": "" , "message" : ""}
        try:
            input = request.get_json(force=True)
            body = input['body']
            movie_id = body['movie_id']
            movie = self.db.get_one_value('movies',{"movie_id":movie_id},[],["_id"])
            output['movie_details'] = movie
            output["status"] = "success"

        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output

    def add_movie(self,input):
        output ={"status": "" , "message" : ""}
        
        movie_details = input['body']

        try:
            self.db.insert_one_data("movies",movie_details)
            output["status"] = "success"
        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output

    def update_movie(self,input):
        output ={"status": "" , "message" : ""}

        try:
            body = input['body']
            movie_id = body['movie_id']
            fields_to_update = body['fields_to_update']
            self.db.update_one('movies',"movie_id",movie_id,fields_to_update)
            output["status"] = "success"
        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output


    def delete_movie(self,input):
        output ={"status": "" , "message" : ""}

        try:
            body = input['body']
            movie_id = body['movie_id']
            self.db.delete_one("movies","movie_id",movie_id)
            output["status"] = "success"
        except Exception as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output
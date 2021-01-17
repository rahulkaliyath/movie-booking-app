from flask import request
from model import db_connection
import jwt
import datetime

class Authenticate:
    def __init__(self):
        self.db=db_connection.Database()

    def authenticate(self,input_data=None):
        # user= input_data['user']
        encoded_jwt=input_data['jwt_token']

        secretKey = 'secret'
        try:
            data = jwt.decode(encoded_jwt,secretKey, algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
            return {
            "status": "error",
            "message": "Token has expired"
            },"expired"
        except:
            return  {
            "status": "error",
            "message": "Invalid Token"
            },"error"
        else:
            input_data['user'] = data['user'] 
            input_data['user_id'] = data['user_id']
            return input_data,"success"


    def login(self):
        output ={"status": "" , "message" : ""}

        try:
            data=request.get_json(force=True)
            
            email=data['email']
            password = data['password']

            user_exists = self.db.get_doc_count("users",{"email":email,"password":password})

            if user_exists:
                user_details = self.db.get_one_value("users",{"email":email},["name","user_id"],["_id"])
                expiration_time= datetime.datetime.utcnow() + datetime.timedelta(days=2)
                payload = {"exp":expiration_time, "user":user_details['name'],"user_id":user_details['user_id']}
                token = jwt.encode(payload,"secret").decode('utf-8')
                output =  {"status":"success","jwt_token":token , "user":user_details['name'],"user_id":user_details['user_id']}

            else:
                output["status"] = "error"
                output['message'] = "Invalid Credentials"


        except Exception  as e:
            output["status"] = "error"
            output['message'] = str(e)

        return output


        
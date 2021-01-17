import pymongo
from pymongo import MongoClient
from config import mongo

class Database:
    def __init__(self):
        self.mongo = MongoClient(mongo.MONGO_URI)
        self.db = self.mongo['movie_booking']

    
    def get_req_fields(self,fields_req,not_req):
        req_fields={}
        for field in fields_req:
            req_fields.update({field:1})
        for field in not_req:
            req_fields.update({field:0})
        return req_fields

    def get_doc_count(self,collection,query):
        data =  self.db[collection].count_documents(query)
        return data

    def get_values(self,collection,query,fields_req,not_req):
        req_fields=self.get_req_fields(fields_req,not_req)
        data=[item for item in self.db[collection].find(query,req_fields)]
        return data

    def get_one_value(self,collection,query,fields_req,not_req):
        req_fields=self.get_req_fields(fields_req,not_req)
        data=self.db[collection].find_one(query,req_fields)
        return data

    def get_values_with_range(self,collection,query,fields_req,not_req,start,end):
        req_fields=self.get_req_fields(fields_req,not_req)
        data=[item for item in self.db[collection].find(query,req_fields).skip(start).limit(end)]
        return data

    def search(self,collection,search_string,filter={},start=0,end=0):

        query = { "$text": { "$search": search_string }}

        if filter:
            query.update(filter)

        data = self.db[collection].find(query ,
            { "score": { "$meta": "textScore" }, "_id":0}).sort([('score', {'$meta': 'textScore'})])
        data = data.skip(start).limit(end)
        data = [item for item in data]
        return data

    def insert_one_data(self,collection,data):
        self.db[collection].insert_one(data)

    def insert_many_data(self,collection,data):
        self.db[collection].insert_many(data)

    def insert_one_to_array(self,collection,key,key_id,field,value):
        self.db[collection].update_one({key:key_id},{"$push":{field:value}})

    def insert_many_to_array(self,collection,key,key_id,field,values):
        self.db[collection].update_one({key:key_id},{"$addToSet":{field:{"$each":values}}})

    def delete_one(self,collection,key,key_id):
        self.db[collection].remove({key:key_id})

    def delete_one_from_array(self,collection,key,key_id,field,value):
        self.db[collection].update_one({key:key_id},{"$pull":{field:value}})

    def delete_many_to_array(self,collection,key,key_id,field,values):
        self.db[collection].update_one({key:key_id},{"$pull":{field:{"$in":values}}})

    def update_one(self,collection,key,key_id,new_values):
        self.db[collection].update_one({key:key_id},{"$set":new_values})   


from flask import jsonify


def build_error_response(msg, code):
    data = {"meta": {"code": code}, "response": {"errors": msg}}
    response = jsonify(data)
    response.status_code = code
    return response

def build_data_response(data, code=200):
    res = {"meta": {"code": code}, "response": {"data": data}}
    response = jsonify(res)
    response.status_code = code
    return response

def build_message_response(msg, code=200):
    res = {"meta": {"code": code}, "response": {"message": msg}}
    response = jsonify(res)
    response.status_code = code
    return response

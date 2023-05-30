from flask import jsonify, Blueprint, Response
from db import conn
import base64
import json

select = Blueprint("select", __name__, url_prefix="/api/get/")

# try:
#     pass
# except Exception as ex:
#     return ex, 500

# List all users
@select.get("users/all")
def get_all_users():
    try:
        cursor = conn.connection.cursor()
        sql = "SELECT u_id, u_type, u_name, u_lastname, u_email FROM users"
        cursor.execute(sql)
        users = cursor.fetchall()
        if users is None or len(users) <= 0:
            return jsonify({"message": "Users not found in DB"}), 404
        return jsonify({"users": users}), 201
    except Exception as ex:
        return ex, 500

#List categories
@select.get("categories")
def get_categories():
    try:
        cursor = conn.connection.cursor()
        sql = "SELECT * FROM categories"
        cursor.execute(sql)
        categories = cursor.fetchall()
        if categories is None or len(categories) <= 0:
            return jsonify({"message": "Categories not found in DB"}), 404
        return jsonify({"categories": categories}), 201
    except Exception as ex:
        return ex, 500

from flask import jsonify, Blueprint, Response
from db import conn
import base64
import json

select = Blueprint("select", __name__, url_prefix="/api/get/")

@select.get("users/all")
def get_all_users():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('get_users_all')
        users = cursor.fetchall()
        if users is None or len(users) <= 0:
            return jsonify({"message": "Users are not found in DB"}), 404
        return jsonify({"users": users}), 200
    except Exception as ex:
        return ex, 500

# List regular users
@select.get("users/regular")
def get_regular_users():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('get_users_regular')
        users = cursor.fetchall()
        if users is None or len(users) <= 0:
            return jsonify({"message": "Users are not found in DB"}), 404
        return jsonify({"users": users}), 200
    except Exception as ex:
        return ex, 500

# List admin users
@select.get("users/admin")
def get_admin_users():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('get_users_admin')
        users = cursor.fetchall()
        if users is None or len(users) <= 0:
            return jsonify({"message": "Users are not found in DB"}), 404
        return jsonify({"users": users}), 200
    except Exception as ex:
        return ex, 500

#List categories
@select.get("categories")
def get_categories():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('get_categories')
        categories = cursor.fetchall()
        if categories is None or len(categories) <= 0:
            return jsonify({"message": "Categories are not found in DB"}), 404
        return jsonify({"categories": categories}), 200
    except Exception as ex:
        return ex, 500

@select.get('products')
def get_products():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('get_products')
        products = cursor.fetchall()
        if products is None or len(products) <= 0:
            return jsonify({"message": "Products are not found in DB"}), 404
        return jsonify({'products': products}), 200
    except Exception as ex:
        return ex, 500
    
# List products images
@select.get('products_img/<int:product_id>')
def get_products_img(product_id):
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('get_products_imgs', [product_id])
        imgs_data = cursor.fetchall()
        imgs_decoded_data = []
        for img in imgs_data:
            imgs_decoded_data.append({
                'img_id': img['pi_id'], 
                'product_id': img['pi_product'], 
                'img': base64.b64encode(base64.b64decode(img['pi_img'])).decode('utf-8')
            })
        return json.dumps(imgs_decoded_data), 200
    except Exception as ex:
        return ex, 500

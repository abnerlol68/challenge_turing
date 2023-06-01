from flask import jsonify, request as req, Blueprint
from db import conn
from flask_bcrypt import Bcrypt
import base64
from io import BytesIO

bcrypt = Bcrypt()
insert = Blueprint('insert', __name__, url_prefix='/api/add/')

@insert.post('user/regular')
def add_user_regular():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('add_user', [
            'U',
            req.json['name'],
            req.json['lastname'],
            req.json['email'],
            bcrypt.generate_password_hash(req.json['password'])
        ])
        user_data = cursor.fetchall()
        cursor.close()
        conn.connection.commit()
        return jsonify({'message': 'Added regular user success', 'user': user_data})
    except Exception as ex:
        return ex, 500
    
# Add admin user
@insert.post('user/admin')
def add_user_admin():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('add_user', [
            'A',
            req.json['name'],
            req.json['lastname'],
            req.json['email'],
            bcrypt.generate_password_hash(req.json['password'])
        ])
        user_data = cursor.fetchall()
        cursor.close()
        conn.connection.commit()
        return jsonify({'message': 'Added regular user success', 'user': user_data})
    except Exception as ex:
        return ex, 500
    
# Add product
@insert.post('product')
def add_product():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('add_product', [
            req.json['name'],
            req.json['price'],
            req.json['category'],
            req.json['user_id'],
        ])
        product_data = cursor.fetchall()
        cursor.close()
        conn.connection.commit()
        return jsonify({'message': 'Added product data success', 'product': product_data})
    except Exception as ex:
        return ex, 500
    
# Add product img
@insert.post('product_img/<int:product_id>')
def add_product_img(product_id):
    try:
        img = req.files['img']
        cursor = conn.connection.cursor()
        cursor.callproc('add_product_img', [
            base64.b64encode(img.stream.read()).decode('utf-8'), 
            product_id
        ])
        
        cursor.close()
        conn.connection.commit()
        return jsonify({
            'message': 'Added product img success'
        })
    except Exception as ex:
        return ex, 500

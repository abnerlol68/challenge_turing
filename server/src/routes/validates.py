from flask import jsonify, request as req, Blueprint
from db import conn
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
validate = Blueprint('validate', __name__, url_prefix='/api/validate/')

# Validate user
@validate.post('user')
def validate_user():
    try:
        cursor = conn.connection.cursor()
        cursor.callproc('validate_user', [
            req.json['email']
        ])
        user_data = cursor.fetchone()
        if (
            user_data is None or 
            not bcrypt.check_password_hash(user_data['u_password'], req.json['password'])
        ):
            return jsonify({"message": "User does not exist"}), 404
        del user_data['u_password']
        return jsonify({'message': 'Login success', 'user': user_data})
    except Exception as ex:
        return jsonify({'Mensaje de error': ex}), 500

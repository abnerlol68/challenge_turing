from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from routes.selects import select
from routes.inserts import insert
from routes.validates import validate
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, origins=os.getenv('ORIGINS'))
conexion = MySQL(app)

app.register_blueprint(select)
app.register_blueprint(insert)
app.register_blueprint(validate)

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company
from api.utils import generate_sitemap, APIException
import bcrypt
from api.encrypted import check_password_hash, encrypted_pass

api = Blueprint('api', __name__)

## USER:

# route for loging user in
@api.route('/login-user', methods=['POST'])
def login():

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return jsonify({"msg":"Email required"}), 400

    if not password:
        return jsonify({"msg":"Password required"}), 400
    

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "The email is not correct", "status": 401})

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "The password is not correct", "status": 401})

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email, expires_delta=timedelta(minutes=100))
        return jsonify({"access_token": access_token}), 200

# route for register user
@api.route('/signup-user', methods=['POST'])
def signup_user():

    body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar qué usuario estamos creando

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

    email = body.get("email") # cogemos el email QUE HA INTRODUCIDO el usuario (lo mismo con el password)
    password = body.get("password")
    name = body.get("name")
    lastname = body.get("lastname")
    phone = body.get("phone")
    birth_date = body.get("birth_date")

    pass_encrypt = encrypted_pass(password)
    print(pass_encrypt)

    user = User(email=email, password=pass_encrypt, name=name, lastname=lastname, phone=phone, birth_date=birth_date) # creamos el usuario: significa que llene la columna email (1er "email") con lo que se haya escrito como email (2o email), y lo mismo con el password

    user.save()  # llamo a la función "save" (está en los modelos) para guardar el usuario en la BBDD

    return jsonify(user.serialize()), 200


## COMPANY:

# route for loging company in
@api.route('/login-company', methods=['POST'])
def login_company():

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return jsonify({"msg":"Email required"}), 400

    if not password:
        return jsonify({"msg":"Password required"}), 400
    

    company = Company.query.filter_by(email=email).first()
    if not company:
        return jsonify({"msg": "The email is not correct", "status": 401})

    if not check_password_hash(company.password, password):
         return jsonify({"msg": "The password is not correct", "status": 401})

    if user and check_password_hash(company.password, password):
        access_token = create_access_token(identity=company.email, expires_delta=timedelta(minutes=100))
        return jsonify({"access_token": access_token}), 200

# route for register company
@api.route('/signup-company', methods=['POST'])
def signup_company():
    body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar qué usuario estamos creando
    
    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

    name = body.get("name")
    email = body.get("email") # cogemos el email QUE HA INTRODUCIDO el usuario
    password = body.get("password")
    cif = body.get("cif")
    contact = body.get("contact")
    phone = body.get("phone")

    pass_encrypt = encrypted_pass(password)
    print(pass_encrypt)

    company = Company(name=name, email=email, password=pass_encrypt, cif=cif, contact=contact, phone=phone) # creamos la empresa

    company.save()  # llamo a la función "save" (está en los modelos) para guardar la empresa en la BBDD

    return jsonify(company.serialize()), 200

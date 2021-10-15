"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, User, Company, Profession, Offer, ProfessionUser, Experience, AcademicTraining
from api.utils import generate_sitemap, APIException
import bcrypt
from api.encrypted import check_password_hash, encrypted_pass

api = Blueprint('api', __name__)


##############
##   USER   ##
##############

# Registro usuario:
@api.route('/signup-user', methods=['POST'])
def signup_user():

    body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar qué usuario estamos creando

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

    email = body.get("email") # cogemos el email QUE HA INTRODUCIDO el usuario (lo mismo con el password, etc)
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

# Login usuario:
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


# Crear la información de CV de un usuario: (INTENTADO.... REVISAR, CORREGIR Y PROBAR!!!!)
@api.route('/user-info/<int:userId>/create', methods=['POST'])
def create_user_info(userId):

    body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar a qué usuario estamos creando el CV

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

    profession = body.get("profession") # cogemos la profesion QUE HA INTRODUCIDO el usuario (lo mismo con el resto)
    academic_degree = body.get("academic_degree")
    study_center = body.get("study_center")
    study_start_date = body.get("study_start_date")
    study_end_date = body.get("study_end_date")
    study_in_progress = body.get("study_in_progress")
    is_academic = body.get("is_academic")
    experience_title = body.get("experience_title")
    experience_description = body.get("experience_description")
    experience_start_date = body.get("experience_start_date")
    experience_end_date = body.get("experience_end_date")
    experience_in_progress = body.get("experience_in_progress")

    profession = Profession(name=profession) # creamos la profesion: significa que llene la columna name con lo que se haya escrito como profession
    profession.save()  # llamo a la función "save" (está en los modelos) para guardar la profesion en la BBDD

    academic_training = AcademicTraining(academic_degree=academic_degree, study_center=study_center, start_date=study_start_date, end_date=study_end_date, in_progress=study_in_progress, is_academic=is_academic)
    academicTraining.save() 

    experience = Experience(title=experience_title, description=experience_description, start_date=experience_start_date, end_date=experience_end_date, in_progress=experience_in_progress)     
    experience.save()  

    return jsonify({"profession": profession, "training": academic_training, "experience": experience}), 200 # TIENE SENTIDO???



# Obtener la información de CV de un usuario: (FUNCIONA)
@api.route('/user-info/<int:userId>/get', methods=['GET'])
# @jwt_required
def show_user_info(userId):
    user = User.query.get(userId)      # le pasamos el ID del user, lo buscamos en la BBDD y lo cogemos con el get
    professions = ProfessionUser.query.filter_by(user_id=userId) # "professions" es un array 

    professions_names = list(map(lambda profession: Profession.query.get(profession.profession_id).name, professions)) # "profession" no es la profesion en si, sino cada fila que veo en el backend con la relación (ej: User1--Profession4)
    academic_trainings = list(map(lambda training: training.serialize(), AcademicTraining.query.filter_by(user_id=userId)))
    experiences = list(map(lambda experience: experience.serialize(), Experience.query.filter_by(user_id=userId)))

    return jsonify({"user_basic": user.serialize(), "professions": professions_names, "trainings": academic_trainings, "experiences": experiences}), 200


# Modificar la información de CV de un usuario: (NO FUNCIONA AUN)
@api.route('/user-info/<int:userId>/edit', methods=['PUT'])
# @jwt_required
def update_user_info(userId):
   # user = User.query.get(userId) 

    name = request.json.get('name', None)
    lastname = request.json.get('lastname', None)
    phone = request.json.get('phone', None)
    birth_date = request.json.get('birth_date', None)

    user = User.query.filter_by(user_id=userId).first()

    body = request.get_json()

    if name != "" in body:
        setattr(user,"name", name)
    # SIMILAR A ESTO:
    # if "name" in body:
    #     name = body["name"]
    # else:
    #     name = None    
    if lastname != "" in body:
        setattr(user,"lastname", lastname)
    if phone != "" in body:
        setattr(user,"phone", phone)
    if birth_date != "" in body:
        setattr(user,"birth_date", birth_date)

    user.save()

    return jsonify(user.serialize()), 200



#################
##   COMPANY   ##
#################

# Registro empresa:
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

# Login empresa:
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

# Obtener la información de una empresa:
@api.route('/companies/<int:company_id>', methods=['GET'])
# @jwt_required
def show_company(company_id):
    company = Company.query.get(company_id)      # lo cogemos de la BBDD con el get
    companySerialized = company.serialize()   # creo una vble. para guardar la empresa serializada

    if company is None:
        return jsonify({"msg": "This company does not exists"}), 404

    return jsonify(companySerialized), 200
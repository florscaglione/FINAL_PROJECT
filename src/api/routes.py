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

    email = body.get("email") # cogemos del body el email QUE HA INTRODUCIDO el usuario (lo mismo con el password, etc)
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

# Eliminar usuario:  (PROBADO EN POSTMAN Y OK!)
@api.route('/user/<int:userId>', methods=['DELETE'])
def delete_user(userId):

    user = User.query.get(userId)
    if not user: 
        return jsonify({"fail": "Usuario no encontrado"}), 404

    user.delete()

    return jsonify({"success": "Usuario eliminado"}), 200     

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


# Crear la información de CV de un usuario (profesión,formación,experiencia): (FUNCIONA)
@api.route('/user-info-profession/<int:userId>/create', methods=['PUT']) # utilizo PUT porque si encuentra la profesión,la modifica, pero si no la encuentra también la añade (como si fuera POST)
def create_user_info_profession(userId):

    body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar a qué usuario estamos creando el CV

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    # Input para introducir nueva profesion, ej: ["ingeniero", "camarero"]
    new_professions = body.get("new_professions", None)   # devuelve el array de nuevas profesiones
    if new_professions:
        for new_profession in new_professions:
            profession = Profession(name=new_profession)
            profession.save()  # llamo a la función "save" (está en los modelos) para guardar la profesion en la BBDD

            user_profession = ProfessionUser(user_id=userId, profession_id=profession.id)
            user_profession.save()  

    # Desplegable de profesiones, ej: [1,2,3] (son los ID de las profesiones existentes)
    all_professions = body.get("all_professions", None) # cogemos la profesion QUE HA INTRODUCIDO el usuario 
    if all_professions:
        for profession_id in all_professions:
            user_profession = ProfessionUser(user_id=userId, profession_id=profession_id)
            user_profession.save()  

    return jsonify({"profession": "Creado con éxito"}), 200 

@api.route('/user-info-training/<int:userId>/create', methods=['POST']) #(PROBADO EN POSTMAN Y OK)
def create_user_info_training(userId):

    body = request.get_json()      

    if body is None:    
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") 

    academic_degree = body.get("academic_degree") # body.get() es igual a request.json.get()
    study_center = body.get("study_center")
    study_start_date = body.get("start_date")   
    study_end_date = body.get("end_date")
    study_in_progress = body.get("in_progress")
    is_academic = body.get("is_academic")

    academic_training = AcademicTraining(user_id=userId, academic_degree=academic_degree, study_center=study_center, start_date=study_start_date, end_date=study_end_date, in_progress=study_in_progress, is_academic=is_academic)
    academic_training.save() 

    return jsonify(academic_training.serialize()), 200 

@api.route('/user-info-experience/<int:userId>/create', methods=['POST']) #(PROBADO EN POSTMAN Y OK)
def create_user_info_experience(userId):

    body = request.get_json()      

    if body is None:   
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") 

    experience_title = body.get("title")    # IMPORTANTE: lo que hay antes del = puedo inventármelo, pero el "title" tiene que ser el mismo que viene de los modelos
    experience_description = body.get("description")
    experience_start_date = body.get("start_date")
    experience_end_date = body.get("end_date")
    experience_in_progress = body.get("in_progress")

    experience = Experience(user_id=userId, title=experience_title, description=experience_description, start_date=experience_start_date, end_date=experience_end_date, in_progress=experience_in_progress)     
    experience.save()  

    return jsonify(experience.serialize()), 200 


# Obtener la información de CV de un usuario: (FUNCIONA)
@api.route('/user-info/<int:userId>/get', methods=['GET'])
# @jwt_required
def show_user_info(userId):
    user = User.query.get(userId)      # le pasamos el ID del user, lo buscamos en la BBDD y lo cogemos con el get
    professions = ProfessionUser.query.filter_by(user_id=userId) # "professions" es un array 

    professions_names = list(map(lambda profession: Profession.query.get(profession.profession_id).name, professions)) # "profession" no es la profesion en si, sino cada fila que veo en el backend (admin) con la relación (ej: User1--Profession4)
    academic_trainings = list(map(lambda training: training.serialize(), AcademicTraining.query.filter_by(user_id=userId)))
    experiences = list(map(lambda experience: experience.serialize(), Experience.query.filter_by(user_id=userId)))

    return jsonify({"user_basic": user.serialize(), "professions": professions_names, "trainings": academic_trainings, "experiences": experiences}), 200


# Modificar la información básica en un CV de un usuario: ( FUNCIONA )
@api.route('/user-info/<int:userId>/edit', methods=['PUT'])
# @jwt_required
def update_user_info(userId):
   # user = User.query.get(userId) 
    body = request.get_json()

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    name = body.get('name', None)   # body.get('name', None) = request.json.get('name', None) !!!!
    lastname = body.get('lastname', None) 
    email = body.get('email', None) 
    phone = body.get('phone', None)
    birth_date = body.get('birth_date', None)

    user = User.query.filter_by(id=userId).first()

    if name:    # similar a   if name != "" and name is not None:
        user.name = name # el primer "name" se refiere a la columna, y el 2o al name introducido (name = body.get('name', None) )
    if lastname:
        user.lastname = lastname 
    if email:
        user.email = email 
    if phone:
        user.phone = phone 
    if birth_date:
        user.birth_date = birth_date         

    db.session.commit()

    return jsonify(user.serialize()), 200



#################
##   COMPANY   ##
#################

# Registro empresa:
@api.route('/signup-company', methods=['POST']) # (PROBADO EN POSTMAN Y OK)
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

# Eliminar empresa:  (FUNCIONA A MEDIAS EN POSTMAN)=> Sólo funciona con las empresas que creo desde postman pero NO con las q creo a mano, por qué??
@api.route('/company/<int:companyId>', methods=['DELETE'])
def delete_company(companyId):

    company = Company.query.get(companyId)
    if not company: 
        return jsonify({"fail": "Empresa no encontrada"}), 404

    company.delete()

    return jsonify({"success": "Empresa eliminada"}), 200    

# Obtener la información de una empresa:    (PROBADO EN POSTMAN Y OK)
@api.route('/companies/<int:company_id>', methods=['GET']) 
# @jwt_required
def show_company(company_id):
    company = Company.query.get(company_id)      # lo cogemos de la BBDD con el get
    companySerialized = company.serialize()   # creo una vble. para guardar la empresa serializada

    if company is None:
        return jsonify({"msg": "This company does not exists"}), 404

    return jsonify(companySerialized), 200

# Crear una oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/offer', methods=['POST']) 
def create_offer():

    body = request.get_json()      

    if body is None:    
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") 

    company_id = body.get("company_id", None)
    title = body.get("title", None) 
    remote_work = body.get("remote_work", None)
    contract_type = body.get("contract_type", None)
    salary_range = body.get("salary_range", None)
    requirement = body.get("requirement", None)
    offer_description = body.get("offer_description", None)
    social_benefit = body.get("social_benefit", None)

    offer = Offer(company_id=company_id, title=title, remote_work=remote_work, contract_type=contract_type, salary_range=salary_range, requirement=requirement, offer_description=offer_description, social_benefit=social_benefit)
    offer.save() 

    return jsonify(offer.serialize()), 200 

# Obtener una oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/offer/<int:offerId>', methods=['GET'])
# @jwt_required
def show_offer(offerId):

    offer = Offer.query.get(offerId)      # le pasamos el ID de la oferta, la buscamos en la BBDD y la cogemos con el get

    if not offer:
        raise APIException("Offer not found", 401)

    return jsonify(offer.serialize()), 200

# Obtener la lista de todas las ofertas de trabajo: (PROBADO EN POSTMAN Y OK)
@api.route('/offers', methods =['GET'])
def get_all_offers():

    offers = Offer.get_all()  # busco en la BBDD todas las ofertas

    all_offers = []  # convierto los objetos de ofertas en array (json)
    for offer in offers:
        all_offers.append(offer.serialize())    # agregando los datos (json) de oferta a la lista de respuesta

    return jsonify({'offers': all_offers}), 200

# Eliminar oferta de trabajo:  (PROBADO EN POSTMAN Y OK!)
@api.route('/offer/<int:offerId>', methods=['DELETE'])
def delete_offer(offerId):

    offer = Offer.query.get(offerId)
    if not offer: 
        return jsonify({"fail": "Oferta no encontrada"}), 404

    offer.delete()

    return jsonify({"success": "Oferta eliminada"}), 200        

# Modificar oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/offer/<int:offerId>', methods=['PUT'])
def update_offer(offerId):
 
    body = request.get_json()

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    title = body.get('title', None)   # body.get('name', None) = request.json.get('name', None) !!!!
    remote_work = body.get('remote_work', None) 
    contract_type = body.get('contract_type', None) 
    salary_range = body.get('salary_range', None)
    requirement = body.get('requirement', None)
    offer_description = body.get("offer_description", None)
    social_benefit = body.get("social_benefit", None)

    offer = Offer.query.filter_by(id=offerId).first()

    if title:    # similar a   if title != "" and title is not None:
        offer.title = title # el primer "title" se refiere a la columna, y el 2o al title introducido (title = body.get('title', None) )
    if remote_work:
        offer.remote_work = remote_work 
    if contract_type:
        offer.contract_type = contract_type 
    if salary_range:
        offer.salary_range = salary_range 
    if requirement:
        offer.requirement = requirement  
    if offer_description:
        offer.offer_description = offer_description 
    if social_benefit:
        offer.social_benefit = social_benefit                

    db.session.commit()

    return jsonify(offer.serialize()), 200

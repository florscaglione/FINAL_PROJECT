"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS, cross_origin
from api.models import db, User, Company, Profession, Offer, ProfessionUser, Experience, AcademicTraining, Inscription
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta

import bcrypt
from api.encrypted import check_password_hash, encrypted_pass

api = Blueprint('api', __name__)


##############
##   USER   ##
##############

# Registro usuario (INFORMACIÓN BÁSICA):
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

# Modificar la INFORMACIÓN BÁSICA en un CV de un usuario: ( FUNCIONA )
@api.route('/user-info/edit', methods=['PUT'])
@jwt_required()
def update_user_info():
    body = request.get_json()

    userId = get_jwt_identity() #
    print(userId)
    user = User.query.get(userId) #

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

    if not check_password_hash(password, user.password):
        return jsonify({"msg": "The password is not correct", "status": 401})

    if user and check_password_hash(password, user.password):
        access_token = create_access_token(identity=user.id, expires_delta=False)
        return jsonify({"access_token": access_token}, user.serialize()), 200

    # SIN ENCRIPTAR CONTRASEÑA:
    # user = User.query.filter_by(email=email, password=password).first()
    # if user is None:
    #     return jsonify({"msg": "Bad email or password"}), 401

    # access_token = create_access_token(identity=user.email)
    # return jsonify(access_token=access_token), 200



###################################################
##   PROFESSION, ACADEMIC_TRAINING, EXPERIENCE   ##
###################################################

# Crear/Modificar una PROFESIÓN en el CV de un usuario: (FUNCIONA)
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

# Eliminar una PROFESIÓN en el CV de un usuario:    (PROBADO EN POSTMAN Y OK)
@api.route('/user-info-profession/<int:professionId>', methods=['DELETE'])
def delete_profession(professionId):

    profession = Profession.query.get(professionId)
    if not profession: 
        return jsonify({"fail": "Profesión no encontrada"}), 404

    profession.delete()

    return jsonify({"success": "Profesión eliminada"}), 200            

# Crear una FORMACIÓN en el CV de un usuario: (FUNCIONA)
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

# Modificar una FORMACIÓN en el CV de un usuario:  (FUNCIONA)
@api.route('/user-info-training/edit/<int:trainingId>', methods=['PUT']) 
def update_user_info_training(trainingId):

    body = request.get_json()      

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    academic_degree = body.get('academic_degree', None)  
    study_center = body.get('study_center', None) 
    study_start_date = body.get('start_date', None) 
    study_end_date = body.get('end_date', None)
    study_in_progress = body.get('in_progress', None)
    study_is_academic = body.get('is_academic', None)

    training = AcademicTraining.query.filter_by(id=trainingId).first()

    if academic_degree:   
        training.academic_degree = academic_degree 
    if study_center:
        training.study_center = study_center 
    if study_start_date:
        training.start_date = study_start_date 
    if study_end_date:
        training.end_date = study_end_date 
    if study_in_progress is not None:
        training.in_progress = study_in_progress  
    if study_is_academic is not None:
        training.is_academic = study_is_academic                 

    db.session.commit()

    return jsonify(training.serialize()), 200  

# Eliminar una FORMACIÓN en el CV de un usuario:    (PROBADO EN POSTMAN Y OK)
@api.route('/user-info-training/<int:trainingId>', methods=['DELETE'])
def delete_training(trainingId):

    training = AcademicTraining.query.get(trainingId)
    if not training: 
        return jsonify({"fail": "Formación Académica no encontrada"}), 404

    training.delete()

    return jsonify({"success": "Formación Académica eliminada"}), 200            

# Crear una EXPERIENCIA en el CV de un usuario: (PROBADO EN POSTMAN Y OK)
@api.route('/user-info-experience/<int:userId>/create', methods=['POST']) 
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

# Modificar una EXPERIENCIA en el CV de un usuario:  (PROBADO EN POSTMAN Y OK)
@api.route('/user-info-experience/<int:experienceId>', methods=['PUT']) 
def update_user_info_experience(experienceId):

    body = request.get_json()      

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    title = body.get('title', None)   # body.get('name', None) = request.json.get('name', None) !!!!
    description = body.get('description', None) 
    experience_start_date = body.get('start_date', None) 
    experience_end_date = body.get('end_date', None)
    experience_in_progress = body.get('in_progress', None)

    experience = Experience.query.filter_by(id=experienceId).first()

    if title:   
        experience.title = title 
    if description:
        experience.description = description 
    if experience_start_date:
        experience.start_date = experience_start_date 
    if experience_end_date:
        experience.end_date = experience_end_date 
    if experience_in_progress is not None:      # es necesario especificar que no sea None porque al ser un boolean no entra en el IF si es false
        experience.in_progress = experience_in_progress             # experience.in_progress = .... (después del punto, el nombre de la COLUMNA)

    db.session.commit()

    return jsonify(experience.serialize()), 200      

# Eliminar una EXPERIENCIA en el CV de un usuario:    (PROBADO EN POSTMAN Y OK)
@api.route('/user-info-experience/<int:experienceId>', methods=['DELETE'])
def delete_experience(experienceId):

    experience = Experience.query.get(experienceId)
    if not experience: 
        return jsonify({"fail": "Experiencia no encontrada"}), 404

    experience.delete()

    return jsonify({"success": "Experiencia eliminada"}), 200            

# Obtener la información de CV de un usuario (DATOS PERSONALES, PROFESIÓN, FORMACIÓN, EXPERIENCIA): (FUNCIONA)
@api.route('/user-info/get', methods=['GET'])
@jwt_required()
def show_user_info():
    userId = get_jwt_identity() #

    user = User.query.get(userId)      # le pasamos el ID del user, lo buscamos en la BBDD y lo cogemos con el get
    professions = ProfessionUser.query.filter_by(user_id=userId) # "professions" es un array 
    academics = AcademicTraining.query.filter_by(user_id=userId).order_by(AcademicTraining.id.desc())
    experiences = Experience.query.filter_by(user_id=userId).order_by(Experience.id.desc()) # order_by para que al editar una formación se quede en su sitio en el CV (porque antes lo ponía el último)

    professions_names = list(map(lambda profession: Profession.query.get(profession.profession_id).name, professions)) # "profession" no es la profesion en si, sino cada fila que veo en el backend (admin) con la relación (ej: User1--Profession4)
    academic_trainings = list(map(lambda training: training.serialize(), academics))
    experiences = list(map(lambda experience: experience.serialize(), experiences))

    return jsonify({"user_basic": user.serialize(), "professions": professions_names, "trainings": academic_trainings, "experiences": experiences}), 200

# Obtener la lista de todas las profesiones: (PROBADO EN POSTMAN Y OK)
@api.route('/professions', methods =['GET'])
def get_all_professions():

    professions = Profession.get_all()  # busco en la BBDD todas las profesiones

    all_professions = []  # convierto los objetos de profesiones en array (json)
    for profession in professions:
        all_professions.append(profession.serialize())    # agregando los datos (json) de profesiones a la lista de respuesta

    return jsonify(all_professions), 200 

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

# Modificar la información de una empresa: (PROBADO EN POSTMAN Y OK)!!
@api.route('/company-info/<int:companyId>', methods=['PUT'])
# @jwt_required
def update_company_info(companyId):

    body = request.get_json()

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    name = body.get('name', None)   # body.get('name', None) = request.json.get('name', None) !!!!
    email = body.get('email', None) 
    cif = body.get('cif', None)
    contact = body.get('contact', None)
    phone = body.get('phone', None)

    company = Company.query.filter_by(id=companyId).first()

    if name:    # similar a   if name != "" and name is not None:
        company.name = name # el primer "name" se refiere a la columna, y el 2o al name introducido (name = body.get('name', None) ) 
    if email:
        company.email = email 
    if cif:
        company.cif = cif
    if contact:
        company.contact = contact
    if phone:
        company.phone = phone        

    db.session.commit()

    return jsonify(company.serialize()), 200

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



###############
##   OFFER   ##
###############

# Crear una oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/company/<int:company_id>/offer', methods=['POST']) 
def create_offer(company_id):

    body = request.get_json()      

    if body is None:    
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") 

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

# Inscribirse en una oferta de trabajo:  (FUNCIONA)
@api.route('/offer/<int:offer_id>/inscription-user/<int:user_id>', methods=['POST']) 
#@jwt_required()  # SE LO QUITO MOMENTÁNEAMENTE PORQUE HACE QUE NO SE PUEDA INSCRIBIR A UNA OFERTA, PDTE. SOLUCIONAR
def inscription_offer(offer_id, user_id):

    inscription_exist = Inscription.query.filter_by(offer_id=offer_id, user_id=user_id).first()

    if not inscription_exist:
        inscription = Inscription(offer_id=offer_id, user_id=user_id)
        inscription.save() 

        return jsonify(inscription.serialize()), 200

    raise APIException("Inscription already exists", 401)

# Buscar si un usuario está inscrito en una oferta:  (FUNCIONA)
@api.route('/offer/<int:offer_id>/inscription-user/<int:user_id>', methods=['GET']) 
#@jwt_required()
def inscription_offer_exist(offer_id, user_id):

    inscription_exist = Inscription.query.filter_by(offer_id=offer_id, user_id=user_id).first()

    if not inscription_exist:
        return jsonify(False), 201

    return jsonify(True), 200

# Obtener una oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/offer/<int:offerId>', methods=['GET'])
# @jwt_required
def show_offer(offerId):

    offer = Offer.query.get(offerId)      # le pasamos el ID de la oferta, la buscamos en la BBDD y la cogemos con el get

    if not offer:
        raise APIException("Offer not found", 401)

    return jsonify(offer.serialize()), 200

# Obtener la lista de todas las ofertas de trabajo: (FUNCIONA)
@api.route('/offers', methods =['GET'])
def get_all_offers():

    offers = Offer.get_all()  # busco en la BBDD todas las ofertas

    all_offers = []  # convierto los objetos de ofertas en array (json)
    for offer in offers:
        all_offers.append(offer.serialize())    # agregando los datos (json) de oferta a la lista de respuesta

    return jsonify(all_offers), 200 

# # Obtener todas las profesiones (offer.title) para el buscador:
# @api.route('/title', methods =['GET'])                                # CAMBIAR EL NOMBRE DEL ENDPOINT???
# def get_all_offers_titles():    

#     titles = Offer.query.all()
#     return jsonify(titles)


# Obtener la lista de todas las ofertas de trabajo DE UNA EMPRESA: (FUNCIONA)
@api.route('/company/<int:company_id>/offers', methods =['GET'])
def get_all_offers_in_company(company_id):

    offers = Offer.query.filter_by(company_id=company_id).order_by(Offer.id.desc())    # busco en la BBDD todas las ofertas

    all_offers = []  # convierto los objetos de ofertas en array (json)
    for offer in offers:
        all_offers.append(offer.serialize())    # agregando los datos (json) de oferta a la lista de  respuesta

    return jsonify(all_offers), 200

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
    
################
##  BUSCADOR  ##
################ 

# Buscador de profesiones (offer.title):  (PROBADO EN POSTMAN Y FUNCIONA, PERO NO SÉ SI TENGO QUE DEVOLVER OTRA COSA)
@api.route('/search', methods=['POST'])
def get_professions_filtered():
    json = request.get_json()

    text_selected = json.get("text_selected", None)

    query = Offer.query

    if text_selected is not None:
        query.filter_by(title=text_selected)

    return jsonify(text_selected), 200

##################
##  CREAR BBDD  ##
##################  QUÉ MÁS HACER ? ES DECIR, DÓNDE SE USA ESTE ENDPOINT Y CUÁNDO?

# @api.route('/create-database', methods=['GET'])
# def create_database():

#     offer5 = Offer(
#         title = "Programador backend",
#         remote_work = "Teletrabajo 100%, horario flexible",
#         contract_type = "Indefinido",
#         salary_range = "18.000€/año",
#         requirement = "4 años de experiencia trabajando con PHP",
#         offer_description = "Estamos buscando un perfil de Programador PHP con más de 4 años de experiencia para incorporarse en uno de nuestros clientes finales en Barcelona.",
#         social_benefit = "Formación bonificada"
#     )

#     db.session.add(offer5)
#     db.session.commit()

#     return jsonify("database ok"), 200

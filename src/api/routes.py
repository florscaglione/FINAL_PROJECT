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

import cloudinary
import cloudinary.uploader
import cloudinary.api
import os # Para poder utilizar la variables entorno que hemos importado de cloudinary al .env

import bcrypt
from api.encrypted import check_password_hash, encrypted_pass

api = Blueprint('api', __name__)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg']) # Array de extensiones permitidas para subir fotos a Cloudinary

##############
##   USER   ##
##############

# Registro usuario (INFORMACIÓN BÁSICA):
@api.route('/signup-user', methods=['POST'])
def signup_user():
    try:
        body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar qué usuario estamos creando

        if body is None:    # si no lo encuentra, tira este error 
            raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

        email = body.get("email") # cogemos del body el email QUE HA INTRODUCIDO el usuario (lo mismo con el password, etc)
        password = body.get("password")
        name = body.get("name")
        lastname = body.get("lastname")
        phone = body.get("phone")
        birth_date = body.get("birth_date")

        email_check = db.session.query(User).filter(User.email==email).first()
        if email_check is None: 
            pass_encrypt = encrypted_pass(password)
            print(pass_encrypt)

            user = User(email=email, password=pass_encrypt, name=name, lastname=lastname, phone=phone, birth_date=birth_date) # creamos el usuario: significa que llene la columna email (1er "email") con lo que se haya escrito como email (2o email), y lo mismo con el password

            user.save()  # llamo a la función "save" (está en los modelos) para guardar el usuario en la BBDD

            return jsonify(user.serialize()), 200
        else:
            return jsonify("Email already exists") , 409
    except OSError as error:
        return jsonify("error"), 400           

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

# Subir imagen a un usuario ya existente
@api.route('/upload-file', methods=['POST'])
@jwt_required()
def upload_file():
    #el usuario que se le ingresa la imagen
    userId = get_jwt_identity() #

    user = User.query.get(userId)

    #congif cloudinary
    cloudinary.config(
        cloud_name= os.getenv('CLOUD_NAME'),
        api_key= os.getenv('API_KEY'),
        api_secret= os.getenv('API_SECRET')
    )

    #para subir solo una imagen
    file_upload = request.files.get('file') # Recibir el archivo cargado en el input de la vista newcv
    print(file_upload)
    if file_upload:
        print(file_upload.filename)
        file_name=file_upload.filename # El archivo es un objeto, se incluye el nombre del archivo y necesitamos verificar la extensión
        #validar la extension del archivo
        if file_upload.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS: #Agarro el nombre del archivo y separamos la extensión para poder comprobar que esta permitida
            upload_result = cloudinary.uploader.upload(file_upload) #Enviamos directamente a Cloudinary la foto del usuario
            print(upload_result) #Sirve para ver la respuesta de Cloudinary al enviar el archivo, vemos que es lo que vamos a guardar en la base de datos
            if upload_result:
                user.image_url = upload_result.get('secure_url') #Guardamos en base de datos la url que nos devuelve Cloudinary
                user.save() 
                  
                return jsonify(user.serialize()), 200

    return jsonify("Image format invalid"), 400

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
@api.route('/user-info-profession/<int:profession_id>/create', methods=['PUT']) # utilizo PUT porque si encuentra la profesión,la modifica, pero si no la encuentra también la añade (como si fuera POST)
@jwt_required() #
def create_user_info_profession(profession_id):

    body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar a qué usuario estamos creando el CV

    userId = get_jwt_identity() #

    user = User.query.get(userId)   #

    if body is None:    # si no lo encuentra, tira este error 
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario
   
    profession = Profession.query.get(profession_id)

    professionUser = ProfessionUser(user_id=userId, profession_id=profession_id)
    user.professionUsers.append(professionUser)

    user.save()

    return jsonify(profession.serialize()), 200 

    # Input para introducir nueva profesion, ej: ["ingeniero", "camarero"] (DE MOMENTO NO LO USAMOS)
    
    # new_professions = body.get("new_professions", None)   # devuelve el array de nuevas profesiones
    # if new_professions:
    #     for new_profession in new_professions:
    #         profession = Profession(name=new_profession)
    #         profession.save()  # llamo a la función "save" (está en los modelos) para guardar la profesion en la BBDD

    #         user_profession = ProfessionUser(user_id=userId, profession_id=profession.id)
    #         user_profession.save()  

    # Desplegable de profesiones, ej: [1,2,3] (son los ID de las profesiones existentes)
    # all_professions = body.get("all_professions", None) # cogemos la profesion QUE HA INTRODUCIDO el usuario 
    # if all_professions:
    #     for profession_id in all_professions:
    #         user_profession = ProfessionUser(user_id=userId, profession_id=profession_id)
    #         user_profession.save()  

    # return jsonify({"profession": "Creado con éxito"}), 200 

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

# Obtener la lista de todas las profesiones: (FUNCIONA)
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
    try:
        body = request.get_json()       # con esto COGEMOS EL BODY que le enviamos para indicar qué usuario estamos creando
        
        if body is None:    # si no lo encuentra, tira este error 
            raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") # lanzo una excepción que la aplicación captura y devuelve al usuario

        name = body.get("name")
        email = body.get("email") # cogemos el email QUE HA INTRODUCIDO el usuario
        password = body.get("password")
        cif = body.get("cif")
        contact = body.get("contact")
        phone = body.get("phone")

        email_check = db.session.query(Company).filter(Company.email==email).first()
        cif_check = db.session.query(Company).filter(Company.cif==cif).first()
        if email_check is None and cif_check is None:
            pass_encrypt = encrypted_pass(password)
            print(pass_encrypt)

            company = Company(name=name, email=email, password=pass_encrypt, cif=cif, contact=contact, phone=phone) # creamos la empresa

            company.save()  # llamo a la función "save" (está en los modelos) para guardar la empresa en la BBDD

            return jsonify(company.serialize()), 200
        else:
            return jsonify("Company or email already exists"), 409
    except OSError as error:
        return jsonify("error"), 400        

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

    print(password)
    print(company.password)

    if not check_password_hash(password, company.password):
         return jsonify({"msg": "The password is not correct", "status": 401})

    if company and check_password_hash(password, company.password):
        access_token = create_access_token(identity=company.id, expires_delta=False)
        return jsonify({"access_token": access_token}, company.serialize()), 200

# Modificar la información de una empresa: (PROBADO EN POSTMAN Y OK)!!
@api.route('/company-info', methods=['PUT'])
@jwt_required() #
def update_company_info():

    body = request.get_json()

    companyId = get_jwt_identity()  #

    company = Company.query.get(companyId)  #

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
@api.route('/companies', methods=['GET']) 
@jwt_required() 
def show_company():
    companyId = get_jwt_identity()
    
    company = Company.query.get(companyId)      # lo cogemos de la BBDD con el get
    companySerialized = company.serialize()   # creo una vble. para guardar la empresa serializada

    if company is None:
        return jsonify({"msg": "This company does not exists"}), 404

    return jsonify(companySerialized), 200



###############
##   OFFER   ##
###############

# Crear una oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/company/offer', methods=['POST']) 
@jwt_required()
def create_offer():

    body = request.get_json()  

    companyId = get_jwt_identity()

    company = Company.query.get(companyId)    

    if body is None:    
        raise APIException("No se ha enviado un JSON o no se ha especificado en el header que se nos ha enviado un JSON") 

    title = body.get("title", None) 
    remote_work = body.get("remote_work", None)
    contract_type = body.get("contract_type", None)
    salary_range = body.get("salary_range", None)
    requirement = body.get("requirement", None)
    offer_description = body.get("offer_description", None)
    social_benefit = body.get("social_benefit", None)

    offer = Offer(company_id=companyId, title=title, remote_work=remote_work, contract_type=contract_type, salary_range=salary_range, requirement=requirement, offer_description=offer_description, social_benefit=social_benefit)
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

# Buscar todos los usuarios que están inscritos en una oferta:  
@api.route('/offer/<int:offer_id>/inscription-user', methods=['GET']) 
@jwt_required()
def inscripted_users(offer_id):

    all_users_inscripted = Inscription.query.filter_by(offer_id=offer_id).all()

    if not all_users_inscripted:
        return jsonify("There are not users inscripted yet"), 400

    all_users = list(map(lambda inscription: User.query.get(inscription.user_id).serialize(), all_users_inscripted)) # para cada inscripción, busco el id de usuario para de ahí sacar el propio usuario

    return jsonify(all_users), 200    

# Obtener una oferta de trabajo:  (PROBADO EN POSTMAN Y OK)
@api.route('/offer/<int:offerId>', methods=['GET'])
@jwt_required()
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

# Obtener la lista de todas las ofertas de trabajo en las que se ha inscrito un usuario: (FUNCIONA)
@api.route('/offer-by-user', methods =['GET'])
@jwt_required()
def get_offers_by_userId():

    userId = get_jwt_identity()

    inscriptions = Inscription.query.filter_by(user_id=userId) # me devuelve un array de inscripciones

    all_offers = []  # convierto los objetos de ofertas en array (json)
    for offer in inscriptions:
        all_offers.append(Offer.query.get(offer.offer_id).serialize())    # agregando los datos (json) de oferta a la lista de respuesta

    return jsonify(all_offers), 200 

# # Obtener todas las profesiones (offer.title) para el buscador:
# @api.route('/title', methods =['GET'])                                # CAMBIAR EL NOMBRE DEL ENDPOINT???
# def get_all_offers_titles():    

#     titles = Offer.query.all()
#     return jsonify(titles)


# Obtener la lista de todas las ofertas de trabajo DE UNA EMPRESA: (FUNCIONA)
@api.route('/company/offers', methods =['GET'])
@jwt_required()
def get_all_offers_in_company():

    companyId = get_jwt_identity()

    company = Company.query.get(companyId)

    offers = Offer.query.filter_by(company_id=companyId).order_by(Offer.id.desc())    # busco en la BBDD todas las ofertas

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
@jwt_required()
def update_offer(offerId):
 
    body = request.get_json()

    offer = Offer.query.get(offerId)

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
##################  

@api.route('/create-database', methods=['GET'])
def create_database():

    # offer5 = Offer(
    #     title = "Programador backend",
    #     remote_work = "Teletrabajo 100%, horario flexible",
    #     contract_type = "Indefinido",
    #     salary_range = "18.000€/año",
    #     requirement = "4 años de experiencia trabajando con PHP",
    #     offer_description = "Estamos buscando un perfil de Programador PHP con más de 4 años de experiencia para incorporarse en uno de nuestros clientes finales en Barcelona.",
    #     social_benefit = "Formación bonificada",
    #     company_id = "1"
    # )

    # db.session.add(offer5)
    # db.session.commit()

    # return jsonify("database ok"), 200

    data = {
        "offers": [
            {
                "title": "Programador backend",
                "remote_work": "Teletrabajo 100%, horario flexible",
                "contract_type": "Indefinido",
                "salary_range": "18.000€/año",
                "requirement": "4 años de experiencia trabajando con PHP",
                "offer_description": "Buscamos un perfil de Programador con más de 4 años de experiencia para incorporarse en uno de nuestros clientes finales",
                "social_benefit": "Formación bonificada",
                "company_id": "1"
            },
            {
                "title": "Programador frontend",
                "remote_work": "Jornada completa, horario flexible",
                "contract_type": "Temporal",
                "salary_range": "15.000-18.000€/año",
                "requirement": "Sin experiencia previa",
                "offer_description": "Estamos buscando un programador junior con ganas de aprender y crecer en nuestra compañía",
                "social_benefit": "",
                "company_id": "1"
            },
            {
                "title": "Programador junior full stack",
                "remote_work": "Teletrabajo 100%, joranda completa",
                "contract_type": "Temporal",
                "salary_range": "15.000-20.000€/año",
                "requirement": "Perfil junior con ganas de crecer ganas de crecer dentro de la empresa.",
                "offer_description": "Buscamos seleccionar a un programador para una empresa que ofrece servicios tecnológicos del sector de la construcción.",
                "social_benefit": "Formación bonificada",
                "company_id": "1"
            },
            {
                "title": "Diseñador web",
                "remote_work": "Horario flexible, media jornada",
                "contract_type": "Indefinido",
                "salary_range": "15.000-20.000€/año",
                "requirement": "Figma, Photoshop, Ilustrator.",
                "offer_description": "Se busca diseñador gráfico, no necesaria experiencia pero sí ganas de aprender y crecer con la compañía.",
                "social_benefit": "Cheque guardería",
                "company_id": "1"
            },
            {
                "title": "Diseñador gráfico",
                "remote_work": "Si. Horario flexible, media jornada",
                "contract_type": "Interinidad",
                "salary_range": "18.000-20.000€/año",
                "requirement": "No se requiere experiencia previa.",
                "offer_description": "Se busca diseñador gráfico con conocimientos de Figma e Ilustrator.",
                "social_benefit": "Formación bonificada",
                "company_id": "1"
            }
        ],

        "professions": [
            {
                "name": "Programador backend"
            },
            {
                "name": "Programador frontend"
            },
            {
                "name": "Programador frontend"
            },
            {
                "name": "Programador full stack"
            },
            {
                "name": "Diseñador web"
            },
            {
                "name": "Diseñador gráfico"
            },
            {
                "name": "Administrativo"
            },
            {
                "name": "Profesor de inglés"
            },
            {
                "name": "Profesor de alemán"
            },
            {
                "name": "Profesor de chino"
            },
            {
                "name": "Asesor financiero"
            },
            {
                "name": "Agente de viajes"
            },
            {
                "name": "Agente de seguros"
            }
        ],
    }


    for offer in data['offers']:
        new_offer = Offer(title = offer['title'], remote_work = offer['remote_work'], contract_type = offer['contract_type'], salary_range = offer['salary_range'], requirement = offer['requirement'], offer_description = offer['offer_description'], social_benefit = offer['social_benefit'], company_id = offer['company_id'])
        db.session.add(new_offer)

    for profession in data['professions']:
        new_profession = Profession(name = profession['name'])
        db.session.add(new_profession)

    db.session.commit()
    
    return jsonify({"msg": "database loaded"})
    
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=False, nullable=False)
    birth_date = db.Column(db.DateTime, unique=False, nullable=True)
    profession = db.Column(db.String(120), unique=False, nullable=False)
    academic_training = db.Column(db.String(300), unique=False, nullable=False)
    further_training = db.Column(db.String(300), unique=False, nullable=False)
    experience = db.Column(db.String(400), unique=False, nullable=False)
    skill = db.Column(db.String(50), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "birth_date": self.birth_date,
            "profession": self.profession,
            "academic_training": self.academic_training,
            "experience": self.experience,
            "skill": self.skill
        }


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    cif = db.Column(db.String(9), unique=True, nullable=False)
    contact = db.Column(db.String(80), unique=False, nullable=False)
    phone = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Company %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "cif": self.cif,
            "contact": self.contact,
            "phone": self.phone
        }


class Offer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=False, nullable=False)
    remote_work = db.Column(db.String(120), unique=False, nullable=False)
    contract_type = db.Column(db.String(80), unique=False, nullable=False)
    salary_range = db.Column(db.String(9), unique=False, nullable=False)
    requirement = db.Column(db.String(80), unique=False, nullable=False)
    offer_description = db.Column(db.String(80), unique=False, nullable=False)
    social_benefit = db.Column(db.String(80), unique=False, nullable=True)

    def __repr__(self):
        return '<Offer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "remote_work": self.remote_work,
            "contract_type": self.contract_type,
            "salary_range": self.salary_range,
            "requirement": self.requirement,
            "offer_description": self.offer_description,
            "social_benefit": self.social_benefit
        }


class Inscription(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE')) # ondelete: permite eliminar datos de las tablas secundarias automáticamente cuando elimina los datos de la tabla principal
    offer_id = db.Column(db.Integer(), db.ForeignKey('offer.id', ondelete='CASCADE'))


class FavoriteOffer(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE')) # ondelete: permite eliminar datos de las tablas secundarias automáticamente cuando elimina los datos de la tabla principal
    offer_id = db.Column(db.Integer(), db.ForeignKey('offer.id', ondelete='CASCADE'))
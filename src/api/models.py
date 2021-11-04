from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=False, nullable=False)
    birth_date = db.Column(db.Date(), unique=False, nullable=True)

    inscriptions = db.relationship('Inscription', backref=db.backref('user', lazy=True))

    favoriteOffers = db.relationship('FavoriteOffer', backref=db.backref('user', lazy=True))

    professionUsers = db.relationship('ProfessionUser', backref=db.backref('user', lazy=True))



    def __repr__(self):
        return '<User %r>' % self.id

    def password_bcrypt(self):
        return self.password    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "birth_date": self.birth_date.strftime("%Y-%m-%d")
        }
        
    def save(self):
        db.session.add(self)   
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
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
            "cif": self.cif,
            "contact": self.contact,
            "phone": self.phone
        }

    def save(self):
        db.session.add(self)   
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()    


class Offer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=False, nullable=False)
    remote_work = db.Column(db.String(120), unique=False, nullable=False)
    contract_type = db.Column(db.String(80), unique=False, nullable=False)
    salary_range = db.Column(db.String(80), unique=False, nullable=False)
    requirement = db.Column(db.String(80), unique=False, nullable=False)
    offer_description = db.Column(db.String(250), unique=False, nullable=False)
    social_benefit = db.Column(db.String(80), unique=False, nullable=True)

    inscriptions = db.relationship('Inscription', backref=db.backref('offer', lazy=True))

    favoriteOffers = db.relationship('FavoriteOffer', backref=db.backref('offer', lazy=True))

    company_id = db.Column(db.Integer, db.ForeignKey('company.id', ondelete='CASCADE'), nullable=False)

    company = db.relationship('Company', backref=db.backref('offer', lazy=True))

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
            "social_benefit": self.social_benefit,
            "company": self.company.serialize()
        }

    def save(self):
        db.session.add(self)   
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def get_all(cls):
        return cls.query.order_by(Offer.id.desc())

class Inscription(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE')) # ondelete: permite eliminar datos de las tablas secundarias automáticamente cuando elimina los datos de la tabla principal
    offer_id = db.Column(db.Integer(), db.ForeignKey('offer.id', ondelete='CASCADE'))

    def __repr__(self):
        return '<Inscription %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "offer_id": self.offer_id
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class FavoriteOffer(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE')) # ondelete: permite eliminar datos de las tablas secundarias automáticamente cuando elimina los datos de la tabla principal
    offer_id = db.Column(db.Integer(), db.ForeignKey('offer.id', ondelete='CASCADE'))

    def __repr__(self):
        return '<FavoriteOffer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "offer_id": self.offer_id
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class ProfessionUser(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE')) # ondelete: permite eliminar datos de las tablas secundarias automáticamente cuando elimina los datos de la tabla principal
    profession_id = db.Column(db.Integer(), db.ForeignKey('profession.id', ondelete='CASCADE'))

    professionUsers = db.relationship('Profession', backref=db.backref('professionUser'))

    def __repr__(self):
        return '<ProfessionUser %r>' % self.id

    def serialize(self):
        return {
            "user_id": self.user_id,
            "profession_id": self.profession_id
        }
    
    def save(self):
        db.session.add(self)   
        db.session.commit()    


class Profession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    
   # user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)

    #user = db.relationship('User', backref=db.backref('profession', lazy=True))

   # professionUsers = db.relationship('ProfessionUser', backref=db.backref('profession', lazy=True))

    def __repr__(self):
        return '<Profession %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
          #  "user_id": self.user_id
        }
        
    def save(self):
        db.session.add(self)   
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class AcademicTraining(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    academic_degree = db.Column(db.String(300), unique=False, nullable=False)
    study_center = db.Column(db.String(300), unique=False, nullable=False)
    start_date = db.Column(db.Date(), unique=False, nullable=True)
    end_date = db.Column(db.Date(), unique=False, nullable=True)
    in_progress = db.Column(db.Boolean, default=False, nullable=True)
    is_academic = db.Column(db.Boolean, default=False, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', backref=db.backref('academicTraining', lazy=True))

    def __repr__(self):
        return '<AcademicTraining %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "academic_degree": self.academic_degree,
            "study_center": self.study_center,
            "start_date": self.start_date.strftime("%Y-%m-%d"),
            "end_date": self.end_date.strftime("%Y-%m-%d") if self.end_date is not None else self.end_date,
            "in_progress": self.in_progress,
            "is_academic": self.is_academic,
            "user_id": self.user_id
        }

    def save(self):
        db.session.add(self)   
        db.session.commit()   

    def delete(self):
        db.session.delete(self)
        db.session.commit()        

class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=False, nullable=False)
    description = db.Column(db.String(300), unique=False, nullable=False)
    start_date = db.Column(db.Date, unique=False, nullable=False)
    end_date = db.Column(db.Date, unique=False, nullable=True)
    in_progress = db.Column(db.Boolean, default=False, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', backref=db.backref('experience', lazy=True))

    def __repr__(self):
        return '<Experience %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "start_date": self.start_date.strftime("%Y-%m-%d"),
            "end_date": self.end_date.strftime("%Y-%m-%d") if self.end_date is not None else self.end_date,
            "in_progress": self.in_progress,
            "user_id": self.user_id
        }

    def save(self):
        db.session.add(self)   
        db.session.commit()           

    def delete(self):
        db.session.delete(self)
        db.session.commit()
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import uuid

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

def create_unique_id():
    return str(uuid.uuid4())

class Photo(db.Model, SerializerMixin):

    __tablename__ = 'photos'

    serialize_rules = ('-business.photos', )

    id = db.Column(db.Integer, primary_key = True)
    photo_id = db.Column(db.String)
    business_id = db.Column(db.String, db.ForeignKey('businesses.business_id'))
    caption = db.Column(db.String)
    label = db.Column(db.String)

class Business(db.Model, SerializerMixin):

    __tablename__ = 'businesses'

    serialize_rules = ('-photos.business', '-checkins.business', '-reviews', '-tips')
    
    business_id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    postal_code = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    stars = db.Column(db.Float)
    review_count = db.Column(db.Integer)
    is_open = db.Column(db.Integer)
    attributes = db.Column(db.String)
    categories = db.Column(db.String)
    hours = db.Column(db.String)

    photos = db.Relationship('Photo', backref = 'business')
    checkins = db.Relationship('Checkin', backref = 'business')
    reviews = db.Relationship('Review', backref = 'business')
    tips = db.Relationship('Tip', backref = 'business')

class Checkin(db.Model, SerializerMixin):

    __tablename__ = 'checkins'

    serialize_rules = ('-business.checkins', )

    id = db.Column(db.Integer, primary_key = True)
    business_id = db.Column(db.String, db.ForeignKey('businesses.business_id'))
    date = db.Column(db.String)

class Review(db.Model, SerializerMixin):

    __tablename__ = 'reviews'

    serialize_rules = ('-user', '-business')

    review_id = db.Column(db.String, primary_key = True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))
    business_id = db.Column(db.String, db.ForeignKey('businesses.business_id'))
    stars = db.Column(db.Integer)
    date = db.Column(db.String)
    text = db.Column(db.String)
    useful = db.Column(db.Integer)
    funny = db.Column(db.Integer)
    cool = db.Column(db.Integer)

class Tip(db.Model, SerializerMixin):

    __tablename__ = 'tips'

    serialize_rules = ('-user', '-business')

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.String)
    date = db.Column(db.String)
    compliment_count = db.Column(db.Integer)
    business_id = db.Column(db.String, db.ForeignKey('businesses.business_id'))
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'))

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-reviews.user', '-tips.user')

    user_id = db.Column(db.String, primary_key = True, server_default = create_unique_id())
    email = db.Column(db.String, nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    name = db.Column(db.String)
    review_count = db.Column(db.Integer)
    yelping_since = db.Column(db.String)
    friends = db.Column(db.String)
    useful = db.Column(db.Integer)
    funny = db.Column(db.Integer)
    cool = db.Column(db.Integer)
    fans = db.Column(db.Integer)
    elite = db.Column(db.String)
    average_stars = db.Column(db.Float)
    compliment_hot = db.Column(db.Integer)
    compliment_more = db.Column(db.Integer)
    compliment_profile = db.Column(db.Integer)
    compliment_cute = db.Column(db.Integer)
    compliment_list = db.Column(db.Integer)
    compliment_note = db.Column(db.Integer)
    compliment_plain = db.Column(db.Integer)
    compliment_cool = db.Column(db.Integer)
    compliment_funny = db.Column(db.Integer)
    compliment_writer = db.Column(db.Integer)
    compliment_photos = db.Column(db.Integer)

    reviews = db.Relationship('Review', backref = 'user')
    tips = db.Relationship('Tip', backref = 'user')

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates



from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules=('-businesses.user',)
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    
    # Associations
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    businesses = association_proxy('reviews', 'business')
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'
    
    @validates('username')
    def valid_username(self, key, value):
        if value in [user.username for user in User.query.all()]:
            raise ValueError('Username must be unique.')
        return value

class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'
    
    serialize_rules=('-reviews.business',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    rating = db.Column(db.Integer)
    tags = db.Column(db.String)
    highlight = db.Column(db.String)
    img = db.Column(db.String, server_default="/assets/fillerimg.png")
    
    # Associations
    reviews = db.relationship('Review', back_populates='business', cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user')
    
    def __repr__(self):
        return f'<Business {self.name}>'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    serialize_rules = ('-user.reviews', '-business.reviews',)
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    description = db.Column(db.String)
    img = db.Column(db.String, server_default="/assets/fillerimg.png")
    
    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    
    # Associations
    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
    
    def __repr__(self):
        return f'<Review user_id={self.user} business_id={self.business_id} rating={self.rating}>'
    
    
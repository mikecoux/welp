from random import randint, choice as rc
from faker import Faker
from app import app
import json

from models import db, User, Business, Review

with app.app_context():
    print("Deleting all records...")
    User.query.delete()
    Business.query.delete()
    Review.query.delete()
    
    fake = Faker()
    
    print("Creating users...")
    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(20):
        
        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username
        )

        user.password_hash = user.username + 'password'
        users.append(user)

    db.session.add_all(users)
    
    print("Creating businesses...")
    businesses = []
    
    for i in range(100):
        
        highlight = fake.paragraph(nb_sentences=3)
        tags = []
        for i in range(5):
            tag = fake.color_name()
            tags.append(tag)
            
        tags_serial = json.dumps(tags)
        
        business = Business(
            name = fake.company(),
            rating = randint(1,5),
            tags = tags_serial,
            highlight = highlight
        )
        
        businesses.append(business)
    
    db.session.add_all(businesses)
    
    print("Creating reviews...")
    reviews = []
    
    for i in range(250):
        
        review = Review(
            rating = randint(1,5),
            description = fake.paragraph(nb_sentences=1),
        )
        review.user = rc(users)
        review.business = rc(businesses)
        reviews.append(review)
        
    db.session.add_all(reviews)
        
    
    db.session.commit()
    print("Seeding complete!")
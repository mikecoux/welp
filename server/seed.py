
#!/usr/bin/env python3

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance/app.db')}")

from flask import Flask
from models import db, Photo, Business, Checkin, Review, Tip, User

import pandas as pd

def create_json_dataframe(file_name):
    return pd.read_json(f'seed_data/{file_name}', orient = 'values', lines = True, chunksize = 100000)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)

def create_photos():
    print('Seeding photos...')
    Photo.query.delete()
    obj = create_json_dataframe('photos.json')
    for chunk in obj:
        photos = []
        for row in chunk.to_numpy():
            new_photo = Photo(
                photo_id = str(row[0]),
                business_id = str(row[1]),
                caption = str(row[2]),
                label = str(row[3])
            )
            photos.append(new_photo)
        db.session.add_all(photos)
        db.session.commit()
    print('Finished seeding photos...')

def create_businesses():
    print('Seeding businesses...')
    Business.query.delete()
    obj = create_json_dataframe('yelp_academic_dataset_business.json')
    for chunk in obj:
        businesses = []
        for row in chunk.to_numpy():
            new_business = Business(
                business_id = str(row[0]),
                name = str(row[1]),
                address = str(row[2]),
                city = str(row[3]),
                state = str(row[4]),
                postal_code = str(row[5]),
                latitude = float(row[6]),
                longitude = float(row[7]),
                stars = int(row[8]),
                review_count = int(row[9]),
                is_open = int(row[10]),
                attributes = str(row[11]),
                categories = str(row[12]),
                hours = str(row[13])
            )
            businesses.append(new_business)
        db.session.add_all(businesses)
        db.session.commit()
    print('Finished seeding businesses...')

def create_checkins():
    print('Seeding checkins...')
    Checkin.query.delete()
    obj = create_json_dataframe('yelp_academic_dataset_checkin.json')
    for chunk in obj:
        checkins = []
        for row in chunk.to_numpy():
            new_checkin = Checkin(
                business_id = str(row[0]),
                date = str(row[1])
            )
            checkins.append(new_checkin)
        db.session.add_all(checkins)
        db.session.commit()
    print('Finished seeding checkins...')

def create_reviews():
    print('Seeding reviews...')
    Review.query.delete()
    obj = create_json_dataframe('yelp_academic_dataset_review.json')
    for chunk in obj:
        reviews = []
        for row in chunk.to_numpy():
            new_review = Review(
                review_id = str(row[0]),
                user_id = str(row[1]),
                business_id = str(row[2]),
                stars = int(row[3]),
                useful = int(row[4]),
                funny = int(row[5]),
                cool = int(row[6]),
                text = str(row[7]),
                date = str(row[8])
            )
            reviews.append(new_review)
        db.session.add_all(reviews)
        db.session.commit()
    print('Finish seeding reviews...')

def create_tips():
    print('Seeding tips...')
    Tip.query.delete()
    obj = create_json_dataframe('yelp_academic_dataset_tip.json')
    for chunk in obj:
        tips = []
        for row in chunk.to_numpy():
            new_tip = Tip(
                user_id = str(row[0]),
                business_id = str(row[1]),
                text = str(row[2]),
                date = str(row[3]),
                compliment_count = int(row[4])
            )
            tips.append(new_tip)
        db.session.add_all(tips)
        db.session.commit()
    print('Finished seeding tips...')

def create_users():
    print('Seeding users...')
    User.query.delete()
    obj = create_json_dataframe('yelp_academic_dataset_user.json')
    for chunk in obj:
        users = []
        for row in chunk.to_numpy():
            new_user = User(
                user_id = str(row[0]),
                name = str(row[1]),
                review_count = int(row[2]),
                yelping_since = str(row[3]),
                useful = int(row[4]),
                funny = int(row[5]),
                cool = int(row[6]),
                elite = str(row[7]),
                friends = str(row[8]),
                fans = int(row[9]),
                average_stars = float(row[10]),
                compliment_hot = int(row[11]),
                compliment_more = int(row[12]),
                compliment_profile = int(row[13]),
                compliment_cute = int(row[14]),
                compliment_list = int(row[15]),
                compliment_note = int(row[16]),
                compliment_plain = int(row[17]),
                compliment_cool = int(row[18]),
                compliment_funny = int(row[19]),
                compliment_writer = int(row[20]),
                compliment_photos = int(row[21]),
                email = str(row[0]) + '@welp.com',
                password = 'testing'
            )
            users.append(new_user)
        db.session.add_all(users)
        db.session.commit()
    print('Finished seeding users...')


if __name__ == '__main__':
    with app.app_context():
        create_businesses()
        create_users()
        create_reviews()
        create_photos()
        create_tips()
        create_checkins()
        pass
### The Goal ###

# The goal of this file was to create a installation tool that would run npm install --prefix client, pipenv install, pipenv shell, cd server, unpack the tar data, push the images where they need to go, and unpack and seed the json data.


# import os, sys

# def unpack_data():
#     fail_reason = ''
#     if not os.path.isfile('./tar_data/yelp_dataset.tar'):
#         fail_reason = 'File yelp_dataset.tar not found in /tar_data. You can download the required files from https://www.yelp.com/dataset.'
#     elif not os.path.isfile('./tar_data/yelp_photos.tar'):
#         fail_reason = 'File yelp_photos.tar not found in /tar_data. You can download the required files from https://www.yelp.com/dataset.'
#     elif os.path.isdir('./seed_data'):
#         fail_reason = 'Folder seed_data exists. This probably means you\'ve already unpacked the data. Please delete it before trying to unpack.'
#     elif os.path.isdir('../client/public/photos/yelp_photos'):
#         fail_reason = 'Folder yelp_photos exists. This probably means you\'ve already unpacked the data. Please delete it before trying to unpack.'
#     elif sys.platform.lower() not in ['linux', 'darwin']:
#         fail_reason = 'Operating system is not acceptable. Please make sure you are running Darwin (MacOS) or Linux.'
    
#     if len(fail_reason):
#         print('Failed to unpack data. Reason: ' + fail_reason)
#         return False
    
#     print('All conditions met. Proceeding to extract.')
#     ### Test that these wait prior to going to production.
#     # os.system('mkdir seed_data')
#     # os.system('mkdir ../client/public/photos/yelp_photos')
#     # os.system('tar -xvf ./tar_data/yelp_dataset.tar -C ./seed_data')
#     # os.system('tar -xvf ./tar_data/yelp_photos.tar -C ../client/public/photos/yelp_photos')
#     # os.system('mv ../client/public/photos/yelp_photos/photos.json ./seed_data/photos.json')
#     print(f'Successfully unpacked 2 .tar files!')
#     return True

# def create_database():
#     try:
#         print('Successfully created database and seeded data!')
#         return True
#     except:
#         print('Failed to create database. You may need to unpack your .tar files.')
#         return False

# def run():
#     while True:
#         command_input = ('Do you need to unpack your \'.tar\' files? y/n ')
#         if command_input.lower() == 'y' or command_input.lower() == 'yes':
#             if unpack_data():
#                 create_database()
#             break
#         elif command_input.lower() == 'n' or command_input.lower() == 'no':
#             create_database()
#             break
#         else:
#             print('That is not a valid command. Please enter y or n.')

# # unpack_data()
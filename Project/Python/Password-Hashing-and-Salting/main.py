# PASSWORD HASHING AND SALTING
# AUTHOR: YASHWINI BANSAL


import bcrypt 


password = b"J1M1N"


# hash the password with a salt
# bcrypt.hashpw function is used to hash the password along with a random salt
# gensalt() generates a random salt

hashed = bcrypt.hashpw(password, bcrypt.gensalt())


# verify the password
# bcrypt.checkpw function is used to check if the password matches the hashed password

if bcrypt.checkpw(password, hashed):
    print("It's a match ><")
else:
    print("Didn't match")

import bcrypt

def encrypted_pass(password):
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()
    return hashed

def check_password_hash(password, encrypted_password):
    if (bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8'))):
        print("It Matches!")
        return True
    else:
        print("It Does not Match :(")
        return False


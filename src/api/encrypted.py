import bcrypt

# función de encriptado
def encrypted_pass(password):
    byte_password = bytes(password, 'utf-8')
    hashed = bcrypt.hashpw(byte_password, bcrypt.gensalt())
    return hashed.decode('utf-8')

# función de desencriptado
def check_password_hash(password, encrypted_password):
    byte_password = bytes(password, 'utf-8')
    byte_encrypted_password = bytes(encrypted_password, 'utf-8')

    if (bcrypt.checkpw(byte_password, byte_encrypted_password)):
        print("It Matches!")
        return True
    else:
        print("It Does not Match :(")
        return False


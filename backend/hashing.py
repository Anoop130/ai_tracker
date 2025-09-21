from passlib.context import CryptContext


class Hash:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def bcrypt(password: str):
        return Hash.pwd_context.hash(password)
    
    def verify(hashed_password, plain_password):
        return Hash.pwd_context.verify(plain_password, hashed_password)
import jwt
import datetime


class AuthTokenDecoder:

    def __init__(self, auth_token_entity, secret_key, expiration_time):
        self.auth_token_entity = auth_token_entity
        self.secret_key = secret_key
        self.expiration_time = expiration_time

    def get_user_id_of_auth_token(self, access_token):
        exceptions = jwt.exceptions
        try:
            logged = jwt.decode(access_token, self.secret_key)
        except(exceptions.ExpiredSignatureError, exceptions.InvalidSignatureError,
                exceptions.DecodeError):
            logged = {}
        return logged.get('user_id', None)

    def create_auth_token(self, user_id):
        if self.expiration_time is not None:
            token = jwt.encode({
                'user_id': user_id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=self.expiration_time)
            }, self.secret_key)
        else:
            token = jwt.encode({
                'user_id': user_id,
            }, self.secret_key)

        auth_token = self.auth_token_entity.create(
            user_id=user_id,
            token=token.decode()
        )
        return auth_token

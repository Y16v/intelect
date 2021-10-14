import os
from api.factories.entities.auth_entity import AuthTokenEntityFactory
from api.services.auth_service import AuthTokenDecoder


class AuthServiceFactory:
    @staticmethod
    def create():
        secret_key = os.getenv('SECRET_KEY')
        expiration_time_claim = os.getenv('AUTH_TOKEN_EXPIRATION_TIME_CLAIM')
        if expiration_time_claim is not None:
            if expiration_time_claim.isdigit():
                expiration_time_claim = int(expiration_time_claim)
            else:
                expiration_time_claim = None
        auth_service_entity = AuthTokenEntityFactory.create()
        return AuthTokenDecoder(auth_service_entity, secret_key, expiration_time_claim)

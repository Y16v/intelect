from api.entities.auth import AuthToken


class AuthTokenEntity:
    @staticmethod
    def create(user_id, token, **kwargs):
        return AuthToken(user_id=user_id, token=token)


class AuthTokenEntityFactory:
    @staticmethod
    def create():
        return AuthTokenEntity

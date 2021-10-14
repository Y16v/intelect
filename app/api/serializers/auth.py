from api.serializers.user import UserSerializer


class AuthTokenSerializer:
    @staticmethod
    def create(token):
        return {
            'token': token.token,
            'user_id': token.user_id,
            'user': UserSerializer.serialize(token.user)
        }
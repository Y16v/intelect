from api.exceptions.exeptions import IntelectKgException
from api.serializers.exception import IntelectKgExceptionSerializer


def catch_exception(method):
    def method_wrapper(*args, **kwargs):
        try:
            return method(*args, **kwargs)
        except IntelectKgException as e:
            body = IntelectKgExceptionSerializer.serialize(e)
            status = e.code
        except Exception as e:
            raise e

        return body, status
    return method_wrapper

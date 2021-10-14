from api.exceptions.messages import *
from api.status_code import StatusCode


class IntelectKgException(Exception):
    def __init__(self, code, message, json=""):
        super().__init__(message)
        self.message = message
        self.code = code
        self.json = json


class NoLoggedException(IntelectKgException):
    def __init__(self):
        super().__init__(code=StatusCode.UNAUTHORIZED, message=AUTH_REQUIRED)


class EntityDoesNotExistException(IntelectKgException):
    def __init__(self, message=ENTITY_NOT_FOUND):
        super().__init__(code=StatusCode.NOT_FOUND, message=message)


class NoPermissionException(IntelectKgException):
    def __init__(self, message=USER_PERMISSION_DENIED, json=''):
        super().__init__(code=StatusCode.FORBIDDEN, message=message, json=json)


class InvalidEntityException(IntelectKgException):
    def __init__(self, message="", json=''):
        super().__init__(code=StatusCode.UNPROCESSABLE_ENTITY, message=message, json=json)


class ValidationException(IntelectKgException):
    def __init__(self, message="", json=''):
        super().__init__(code=StatusCode.BAD_REQUEST, message=message, json=json)





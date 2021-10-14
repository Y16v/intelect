from api.exceptions import messages
from api.status_code import StatusCode


class View:
    def __getattr__(self, item):
        if item in self.__dict__:
            return getattr(self.entity, item)
        else:
            return self.error

    @staticmethod
    def error(*args, **kwargs):
        return {
                    'errors': messages.METHOD_NOT_ALLOWED,
                    'status': StatusCode.METHOD_NOT_ALLOWED
               }, StatusCode.METHOD_NOT_ALLOWED

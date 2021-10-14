

class IntelectKgExceptionSerializer:
    @staticmethod
    def serialize(exception):
        return {
            'error': exception.message,
            'status': exception.code
        }
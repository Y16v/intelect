DATE_TIME_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"


class AttributeUtility:
    def __init__(self, entity):
        self.entity = entity

    def __getattr__(self, item):
        try:
            return getattr(self.entity, item)
        except AttributeError:
            return None

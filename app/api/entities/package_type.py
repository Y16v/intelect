

class PackageType:
    def __init__(self,
                 id: int,
                 name: str,
                 price: int,
                 item_month_duration: int,
                 accounts_quantity: int,
                 is_for_individual_students: bool
                 ):
        self.id = id
        self.name = name
        self.price = price
        self.item_month_duration = item_month_duration
        self.accounts_quantity = accounts_quantity
        self.is_for_individual_students = is_for_individual_students

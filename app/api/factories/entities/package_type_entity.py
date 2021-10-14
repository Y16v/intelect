from api.entities.package_type import PackageType


class PackageTypeEntity:
    @staticmethod
    def create(id, name, price, item_month_duration, accounts_quantity, is_for_individual_students, *args, **kwargs):

        return PackageType(
            id=id,
            price=price,
            name=name,
            item_month_duration=item_month_duration,
            accounts_quantity=accounts_quantity,
            is_for_individual_students=is_for_individual_students
        )


class PackageTypeEntityFactory:
    @staticmethod
    def create():

        return PackageTypeEntity

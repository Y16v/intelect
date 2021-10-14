

class PackageTypeSerializer:
    @staticmethod
    def serialize(package_type):
        return {
            'id': package_type.id,
            'name': package_type.name,
            'price': package_type.price,
            'item_month_duration': package_type.item_month_duration,
            'accounts_quantity': package_type.accounts_quantity,
            'is_for_individual_students': package_type.is_for_individual_students
        }

    @staticmethod
    def serialize_list(package_types):
        data = []
        for package_type in package_types:
            data.append(
                PackageTypeSerializer.serialize(package_type)
            )

        return data

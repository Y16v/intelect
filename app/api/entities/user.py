class UserCategory:
    def __init__(self, id, name):
        self.id = id
        self.name = name


class User:
    def __init__(self, id,
                 category_id,
                 school_id,
                 group_id,
                 teacher_id,
                 username,
                 first_name,
                 last_name,
                 phone,
                 email,
                 is_active,
                 student_password=None,
                 start_validity_date=None,
                 active_until=None
                 ):
        self.id = id
        self.category_id = category_id
        self.school_id = school_id
        self.teacher_id = teacher_id
        self.group_id = group_id
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.email = email
        self.is_active = is_active
        self.student_password = student_password
        self.start_validity_date = start_validity_date
        self.active_until = active_until

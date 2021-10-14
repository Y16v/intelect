from collections import namedtuple

PHONE_LENGTH = 40
NAME_LENGTH = 512
USER_PASSWORD_MIN_LENGTH = 4

GameInfo = namedtuple('GameInfo', ['id', 'name', 'code', 'description'])
FieldPoints = namedtuple('FieldPoints', ['field', 'points'])


class UserCategory:
    SUPER_ADMIN = '_super_admin'
    SCHOOL_ADMIN = '_school_admin'
    TEACHER = '_teacher'
    STUDENT = '_student'

    SUPER_ADMIN_CATEGORY_ID = 1
    SCHOOL_ADMIN_CATEGORY_ID = 2
    TEACHER_CATEGORY_ID = 3
    STUDENT_CATEGORY_ID = 4

    CAN_PAYMENT_CATEGORY_IDS = [TEACHER_CATEGORY_ID, STUDENT_CATEGORY_ID]


class Game:
    AFTERBURNER = GameInfo(id=1, name='After burner', code='_after_burner', description='Simple description')
    MULTIPLY_DIVISION_SQUARE_CUBE = GameInfo(
        id=2,
        name='Умножай, дели, квадрат и куб',
        code='_multiply_division_square_cube',
        description='Some description'
    )
    COUNT_COLUMNS = GameInfo(id=3, name='Count Columns', code='_count_columns', description='Simple description')


class ResultActionTypes:
    PLUS = '+'
    MINUS = '-'
    PLUS_MINUS = '+/-'
    MULTIPLE = '×'
    DIVISION = '/'
    SQUARE = '2'
    CUBE = '3'
    SQRT = '√'
    CBRT = '∛'


class AfterburnerValueCoefficients:
    SpeedVars = namedtuple('SpeedVars', ['max_point', 'max_value', 'min_value', 'points_for_minus_unit'])

    action_count = 0.1
    speed_lt_one = SpeedVars(max_point=27, max_value=1, min_value=0.1, points_for_minus_unit=2)
    speed_gt_one = SpeedVars(max_point=5, max_value=5, min_value=1, points_for_minus_unit=1)
    count_digits = 1
    count_digit_minus = 1
    modules = 1
    modules_minus = 1

    right_answer = 0.1
    wrong_answer = 0


class MultiplyDivisionSquareCubeValueCoefficients:
    SpeedVars = namedtuple('SpeedVars', ['max_point', 'max_value', 'min_value', 'points_for_minus_unit'])

    modules = 1
    modules_minus = 1
    count_digits = 0.5
    count_digit_minus = 1
    speed_lt_one = SpeedVars(max_point=27, max_value=1, min_value=0.1, points_for_minus_unit=2)
    speed_gt_one = SpeedVars(max_point=5, max_value=5, min_value=1, points_for_minus_unit=1)
    action_type = {
        ResultActionTypes.MULTIPLE: 1,
        ResultActionTypes.DIVISION: 2,
        ResultActionTypes.SQUARE: 1,
        ResultActionTypes.CUBE: 2,
        ResultActionTypes.SQRT: 3,
        ResultActionTypes.CBRT: 3
    }

    right_answer = 0.001
    wrong_answer = 0.000001


SCHOOL_NAME_MAX_LENGTH = 200
SCHOOL_DEFAULT_PACKAGE_COUNT = 100

COUNT_RESULT_PAGE = 10
COUNT_STUDENTS_PAGE = 10

STUDENT_PASSWORD_LENGTH = 255
ACTION_TYPE_LENGTH_RESULT_ITEM = 255
RESULT_MODULES_LENGTH = 255

VALIDITY_ON_MONTHS = 6

GAME_NAME_MAX_LENGTH = 200
GAME_CODE_MAX_LENGTH = 200

GROUP_NAME_MIN_LENGTH = 4


class PackageProposalStatuses:
    pending = 1
    canceled = 2
    rejected = 3
    confirmed = 4


DATE_FORMAT = '%Y-%m-%d'

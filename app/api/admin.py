from api.models import SchoolORM
from api.models import UserORM, UserCategoryORM, GameORM, PackageTypeORM
from api.models.userorm import GroupORM
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _


@admin.register(GroupORM)
class GroupAdmin(admin.ModelAdmin):
    pass


@admin.register(GameORM)
class GameAdmin(admin.ModelAdmin):
    def has_view_or_change_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('code', 'name')
    readonly_fields = ('code', )


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'id', 'first_name', 'last_name', 'email', 'phone', 'category', 'school')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'school', 'group', 'teacher', 'category')}),
    )


@admin.register(PackageTypeORM)
class PackageTypeAdmin(admin.ModelAdmin):
    list_display = ('price', 'id', 'item_month_duration', 'accounts_quantity', 'is_for_individual_students')


admin.site.unregister(Group)
admin.site.register(UserORM, CustomUserAdmin)
admin.site.register(UserCategoryORM)
admin.site.register(SchoolORM)

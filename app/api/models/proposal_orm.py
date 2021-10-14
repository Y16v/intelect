from api.models import SchoolORM, PackageTypeORM
from api.models.package_type_orm import PACKAGE_PROPOSAL_STATUS_CHOICES
from django.core.paginator import Paginator, EmptyPage
from django.db import models
from api.models.constants import PHONE_LENGTH, NAME_LENGTH, PackageProposalStatuses


class SchoolProposalORM(models.Model):
    phone = models.CharField(max_length=PHONE_LENGTH)
    email = models.EmailField()
    username = models.CharField(max_length=NAME_LENGTH)
    first_name = models.CharField(max_length=NAME_LENGTH)
    last_name = models.CharField(max_length=NAME_LENGTH)
    school_name = models.CharField(max_length=NAME_LENGTH)


class IndividualStudentProposalORM(models.Model):
    phone = models.CharField(max_length=PHONE_LENGTH)
    email = models.EmailField()
    username = models.CharField(max_length=NAME_LENGTH)
    first_name = models.CharField(max_length=NAME_LENGTH)
    last_name = models.CharField(max_length=NAME_LENGTH)


class PackageProposalORM(models.Model):
    school = models.ForeignKey(SchoolORM, on_delete=models.CASCADE)
    package_type = models.ForeignKey(PackageTypeORM, on_delete=models.PROTECT)
    status = models.IntegerField(choices=PACKAGE_PROPOSAL_STATUS_CHOICES,
                                 default=PackageProposalStatuses.pending)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True)

    @staticmethod
    def filter_with_pagination(page, count, **kwargs):
        package_proposals = PackageProposalORM.objects.filter(**kwargs)

        try:
            paginator = Paginator(package_proposals, count)
            return paginator.page(page).object_list, paginator.count

        except EmptyPage:
            return [], 0

    class Meta:
        ordering = ('status', '-id')

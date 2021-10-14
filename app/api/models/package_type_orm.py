from api.models.constants import PackageProposalStatuses
from django.db import models


PACKAGE_PROPOSAL_STATUS_CHOICES = (
    (PackageProposalStatuses.pending, "Pending"),
    (PackageProposalStatuses.canceled, "Canceled"),
    (PackageProposalStatuses.rejected, "Rejected"),
    (PackageProposalStatuses.confirmed, "Confirmed")
)

PACKAGE_TYPE_NAME_MAX_LENGTH = 50


class PackageTypeORM(models.Model):
    name = models.CharField(max_length=PACKAGE_TYPE_NAME_MAX_LENGTH, null=True)
    price = models.PositiveIntegerField()
    item_month_duration = models.PositiveSmallIntegerField()
    accounts_quantity = models.PositiveSmallIntegerField()
    is_for_individual_students = models.BooleanField(default=False)

    def __str__(self):
        return self.name or '-'

from django.db import models
from django.db.models import Manager


class WinnerORM(models.Model):
    student = models.ForeignKey('api.UserORM', on_delete=models.CASCADE)
    points = models.DecimalField(max_digits=20, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    objects = Manager()

    class Meta:
        ordering = ('points', )

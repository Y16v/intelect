from api.models.winnerorm import WinnerORM


class WinnerRepo:
    def __init__(self, winner_entity):
        self.winner_entity = winner_entity

        self.orm = WinnerORM

    def _wrap_queryset_to_entity(self, queryset):
        winners = []
        for winner in queryset:
            winners.append(
                self.winner_entity.create(**winner.__dict__)
            )
        return winners

    def get_all(self):
        winners = WinnerORM.objects.all()

        return self._wrap_queryset_to_entity(winners)

    def create(self, winner):
        winner = self.orm.objects.create(**winner.__dict__)
        return self.winner_entity.create(**winner.__dict__)

    def filter_by_year_and_month(self, year, month):
        winners = self.orm.objects.filter(date__year=year, date__month=month)

        return self._wrap_queryset_to_entity(winners)

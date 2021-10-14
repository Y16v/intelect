from datetime import datetime
from api.factories.interactors.result import DeleteAllResultsInteractorFactory
from django.conf import settings


def summarize_results_for_month():
    print(f'[{datetime.now()}]: Running cron job: "Summarize results for month"')

    try:
        summarize_for_month_interactor = DeleteAllResultsInteractorFactory.create()
        summarize_for_month_interactor.set_params().execute()
    except Exception as e:
        return print(f'[{datetime.now()}]: Summarize results for month failed with following exception:', e, sep='\n')

    print(f'[{datetime.now()}]: Cron job: "Summarize results for month" is succeeded!')

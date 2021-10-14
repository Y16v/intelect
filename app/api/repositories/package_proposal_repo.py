from api.exceptions.exeptions import EntityDoesNotExistException
from api.models.proposal_orm import PackageProposalORM


class PackageProposalRepo:
    def __init__(self, package_proposal_entity):
        self.package_proposal_entity = package_proposal_entity
        self.orm = PackageProposalORM

    def _wrap_queryset_to_entities(self, queryset):
        package_proposals = []
        for package_proposal in queryset:
            package_proposals.append(
                self.package_proposal_entity.create(**package_proposal.__dict__)
            )

        return package_proposals

    def create(self, package_proposal):
        package_proposal_orm = self.orm.objects.create(**package_proposal.__dict__)

        return self.package_proposal_entity.create(**package_proposal_orm.__dict__)

    def filter_with_pagination(self, page=1, count=10, **kwargs):
        params = self._get_proposal_filter_params(kwargs)
        package_proposals, total = self.orm.filter_with_pagination(page=page, count=count, **params)

        return self._wrap_queryset_to_entities(package_proposals), total

    def _get_proposal_filter_params(self, kwargs: dict) -> dict:
        params = {}
        school_id = kwargs.get('school_id', None)
        status = kwargs.get('status', None)

        if school_id:
            params['school_id'] = school_id
        if status:
            params['status'] = status

        return params

    def all_with_pagination(self, page, count):
        package_proposals, total = self.orm.filter_with_pagination(page=page, count=count)

        return self._wrap_queryset_to_entities(package_proposals), total

    def update(self, package_proposal):
        package_proposal_orm = self.orm.objects.filter(id=package_proposal.id)
        package_proposal_orm.update(**package_proposal.__dict__)

        return self.package_proposal_entity.create(**package_proposal.__dict__)

    def get_by_id(self, proposal_id):
        try:
            proposal = self.orm.objects.get(id=proposal_id)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException()

        return self.package_proposal_entity.create(**proposal.__dict__)

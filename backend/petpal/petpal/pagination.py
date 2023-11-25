from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from drf_yasg.inspectors import PaginatorInspector
from drf_yasg import openapi


class DefaultPagination(PageNumberPagination):
    page_size_query_param = 'size'


class DefaultPaginatorInspector(PaginatorInspector):

    def get_paginator_parameters(self, paginator):
        return [
            openapi.Parameter('page', openapi.IN_QUERY, "Page number", False, None, openapi.TYPE_INTEGER),
            openapi.Parameter('size', openapi.IN_QUERY, "Page size", False, None, openapi.TYPE_INTEGER)
        ]

    def get_paginated_response(self, paginator, response_schema):
        return openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=OrderedDict((
                ('count', openapi.Schema(type=openapi.TYPE_INTEGER, description='Total number of items returned.')),
                ('next', openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI, x_nullable=True,
                                        description='Link for next page.')),
                ('previous', openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI, x_nullable=True,
                                            description='Link for previous page.')),
                ('results', response_schema),
            )),
            required=['results']
        )

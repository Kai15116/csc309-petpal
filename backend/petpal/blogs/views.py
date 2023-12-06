from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly
from .models import Blog
from .serializers import BlogSerializer, BlogSearchSerializer

from accounts.permissions import IsPetShelterOrReadOnly

from drf_yasg.utils import swagger_auto_schema

class ListCreateBlogView(ListCreateAPIView):
    """
    get: Searches blogs based on various filters and sorting options. Authentication is not required.
    400 Bad Request will be returned when filter options for the query parameters are invalid.
    When filter options are not given, it will return all blogs.

    post: Create new blog based on the given details of the blog. User are required to be logged in as pet shelter.
    """
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsPetShelterOrReadOnly]

    @swagger_auto_schema(query_serializer=BlogSearchSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def perform_create(self, serializer):
        Blog.objects.create(**serializer.validated_data, owner=self.request.user.petshelter)

    def get_queryset(self):
        serializer = BlogSearchSerializer(data=self.request.query_params)
        serializer.is_valid(raise_exception=True)
        order_by = serializer.validated_data.pop('order_by', None)
        title = serializer.validated_data.pop("title", None)

        search_result = Blog.objects.all().filter(**serializer.validated_data)
        if order_by:
            search_result = search_result.order_by(order_by)
        if title:
            search_result = search_result.filter(title__icontains=title)
        return search_result


class RetrieveUpdateDestroyBlogView(RetrieveUpdateDestroyAPIView):
    """
    get: Blog with given ID will be retrieved. Authentication is not required.

    put: Update blog with given ID based on the given details of the blog.
    User are required to be logged in as pet shelter. User are required to be the owner of the blog.

    patch: Partial update blog with given ID based on the given details of the blog.
    User are required to be logged in as pet shelter. User are required to be the owner of the blog.

    delete: Delete blog with the given ID. User are required to be logged in as pet shelter.
    User are required to be the owner of the blog.
    """
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsPetShelterOrReadOnly]

    def get_queryset(self):
        if self.request.method in SAFE_METHODS or getattr(self, 'swagger_fake_view', False):
            return Blog.objects.all()
        return Blog.objects.filter(owner=self.request.user.petshelter)

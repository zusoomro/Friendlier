from rest_framework import viewsets, permissions
from .serializers import PostSerializer
from .models import Post

# Post viewset


class PostViewSet(viewsets.ModelViewSet):
    """
    An api view set for the posts model.
    """

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

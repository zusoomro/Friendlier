from rest_framework import routers
from .api import PostViewSet

router = routers.DefaultRouter()
router.register('', PostViewSet, 'posts.apps.PostsConfig')

urlpatterns = router.urls

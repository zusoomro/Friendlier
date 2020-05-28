from django.urls import path, include
from rest_framework import routers
from .views import ProfileViewSet, MyProfileView

router = routers.DefaultRouter()
router.register('', ProfileViewSet, basename='profiles')

urlpatterns = [
    path('', include(router.urls)),
    path('me', MyProfileView.as_view(), name='my_profile')
]

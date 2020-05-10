from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    """
    A post object.
    """

    owner = models.ForeignKey(
        User, related_name='posts', on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=100)
    body = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

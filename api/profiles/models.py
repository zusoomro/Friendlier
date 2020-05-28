from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=20, blank=True, unique=True)
    first_name = models.CharField(max_length=20, blank=False)
    last_name = models.CharField(max_length=20, blank=False)
    friends = models.ManyToManyField('self', through='Friendship',
                                     symmetrical=False,
                                     related_name='friends+')

    def add_friend(self, profile, status, sym=True):
        friendship, created = Friendship.objects.get_or_create(
            from_person=self, to_person=profile, status=status)

        if sym:
            profile.add_friend(self, status, sym=False)

        return friendship

    def remove_friend(self, profile, status, sym=True):
        Friendship.objects.filter(
            from_person=self, to_person=profile, status=status).delete()

        if sym:
            profile.remove_friend(self, status, sym=False)

    def send_friend_request(self, profile):
        pass

    def accept_friend_request(self, profile):
        pass

    def remove_friend2(self, profile):
        pass

    def block_user(self, profile):
        pass

    def unblock_user(self, profile):
        pass

    def __str__(self):
        return self.first_name + ' ' + self.last_name + "'s Profile"


class Friendship(models.Model):
    # Enumerating friendship statuses
    AWAITING_FIRST_USER = 0
    AWAITING_SECOND_USER = 1
    FRIENDS = 2
    FIRST_USER_BLOCKED = 3
    SECOND_USER_BLOCKED = 4
    BOTH_BLOCKED = 5

    FRIENDSHIP_STATUSES = (
        (AWAITING_FIRST_USER, 'Friend request sent to first user'),
        (AWAITING_SECOND_USER, 'Friend request sent to second user'),
        (FRIENDS, 'Friends'),
        (FIRST_USER_BLOCKED,
         'The second user has been blocked by the first user'),
        (SECOND_USER_BLOCKED,
         'The first user has been blocked by the second user'),
        (BOTH_BLOCKED, 'Both users have blocked each other')
    )

    from_person = models.ForeignKey(
        Profile, related_name='from_people', on_delete=models.CASCADE)
    to_person = models.ForeignKey(
        Profile, related_name='to_people', on_delete=models.CASCADE)

    status = models.IntegerField(choices=FRIENDSHIP_STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (self.from_person.first_name + ' and '
                + self.to_person.first_name + "'s Friendship")

from rest_framework.test import APITestCase, APIClient
from rest_framework.reverse import reverse
from .models import Profile, Friendship
from .serializers import ProfileSerializer
from django.contrib.auth.models import User
from knox.models import AuthToken


class ProfileTests(APITestCase):

    def setUp(self):
        # Init client
        self.client = APIClient()

        # Create dummy data for the user
        self.register_data = {
            'username': 'test',
            'password': 'testPassword',
            'email': 'test@gmail.com'
        }

        self.loginData = {
            'username': self.register_data['username'],
            'password': self.register_data['password']
        }

        self.profileData = {
            'first_name': 'Test',
            'last_name': 'User',
            'phone_number': '911'
        }

        # Register the user and attach their credentials
        self.user = User.objects.create_user(**self.register_data)
        self.token = AuthToken.objects.create(self.user)[1]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def testCreateProfile(self):
        self.client.post(reverse('profiles-list'), self.profileData)

        self.assertEqual(1, Profile.objects.count())

    def testRetrieveProfile(self):
        profile = Profile.objects.create(**self.profileData, user=self.user)
        profile.refresh_from_db()

        profile2 = self.client.get(
            reverse('profiles-detail', kwargs={'pk': profile.id})).data

        self.assertEqual(ProfileSerializer(profile).data, profile2)

    def testDeleteProfile(self):
        profile = Profile.objects.create(**self.profileData, user=self.user)
        profile.refresh_from_db()

        self.assertEqual(1, Profile.objects.count())

        self.client.delete(
            reverse('profiles-detail', kwargs={'pk': profile.id}))

        self.assertEqual(0, Profile.objects.count())

    def testUpdateProfile(self):
        profile = Profile.objects.create(**self.profileData, user=self.user)
        profile.refresh_from_db()

        self.client.put(
            reverse('profiles-detail', kwargs={'pk': profile.id}),
            {'phone_number': '911'})

        profile.refresh_from_db()

        self.assertEqual('911', profile.phone_number)

    def testGetMyProfile(self):
        profile = Profile.objects.create(**self.profileData, user=self.user)
        profile.refresh_from_db()

        url = reverse('my_profile')

        res = self.client.get(url)

        profile2 = res.data

        self.assertEquals(ProfileSerializer(profile).data, profile2)


class FriendsTests(APITestCase):

    def setUp(self):
        # Init client
        self.client = APIClient()

        # User One Data
        self.register_data = {
            'username': 'test',
            'password': 'testPassword',
            'email': 'test@gmail.com'
        }

        self.loginData = {
            'username': self.register_data['username'],
            'password': self.register_data['password']
        }

        self.profileData = {
            'first_name': 'Test',
            'last_name': 'User',
            'phone_number': '911'
        }

        # Register user one and create credentials
        self.user = User.objects.create_user(**self.register_data)
        self.token = AuthToken.objects.create(self.user)[1]

        # Create user one profile
        self.profile = Profile.objects.create(
            **self.profileData, user=self.user)

        # User Two Data
        self.register_data2 = {
            'username': 'test',
            'password': 'testPassword',
            'email': 'test@gmail.com'
        }

        self.loginData2 = {
            'username': self.register_data2['username'],
            'password': self.register_data2['password']
        }

        self.profileData2 = {
            'first_name': 'Test',
            'last_name': 'User',
            'phone_number': '911'
        }

        # Register user two and create credentials
        self.user2 = User.objects.create_user(**self.register_data2)
        self.token2 = AuthToken.objects.create(self.user2)[1]

        # Create user two profile
        self.profile2 = Profile.objects.create(
            **self.profileData2, user=self.user2)

    def test_send_friend_request(self):
        # Authenticate as user1
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

        # Get the profile id of the second user's profile
        profile2Id = Profile.objects.get(user.email='test@gmail.com')

        # Send a friend request to the second user
        self.client.post(reverse('friend'), kwargs={'profile_id': profile2Id}))

        # Assert that a Friendship was created
        self.assertEqual(1, Friendship.objects.count())

        # Assert that the created friendship has the correct users and status
        friendship=Friendship.objects.get()

        # Correct users (user1 will be the from person because they 
        # were created first and will have the lower pk)
        self.assertEqual(self.user, friendship.from_person)
        self.assertEqual(self.user2, friendship.to_user)

    def test_accept_friend_request(self):
        pass

    def test_deny_friend_request(self):
        pass

    def test_remove_friend(self):
        pass

    def test_get_friends_profiles(self):
        pass

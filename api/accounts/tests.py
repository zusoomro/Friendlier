from rest_framework.test import APITestCase, APIClient
from rest_framework.reverse import reverse
from django.contrib.auth.models import User


class RegisterTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()

        self.register_data = {
            'username': 'test',
            'password': 'testPassword',
            'email': 'test@gmail.com'
        }

        self.loginData = {
            'username': self.register_data['username'],
            'password': self.register_data['password']
        }

    def test_register(self):
        response = self.client.post(reverse('register'), self.register_data)

        response_data_user = response.data['user']

        self.assertEqual(
            self.register_data['username'], response_data_user['username'])
        self.assertEqual(
            self.register_data['email'], response_data_user['email'])
        self.assertEqual(1, User.objects.count())

    def test_login(self):
        User.objects.create_user(**self.register_data)

        response = self.client.post(reverse('login'), self.loginData)

        response_data_user = response.data['user']

        self.assertEqual(
            self.register_data['username'], response_data_user['username'])
        self.assertEqual(
            self.register_data['email'], response_data_user['email'])

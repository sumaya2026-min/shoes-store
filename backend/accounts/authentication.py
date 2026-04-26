from django.contrib.auth import get_user_model
from rest_framework import authentication, exceptions

from .jwt_utils import decode_token

User = get_user_model()


class JWTAuthentication(authentication.BaseAuthentication):
    keyword = 'Bearer'

    def authenticate(self, request):
        header = request.headers.get('Authorization')
        if not header:
            return None

        try:
            keyword, token = header.split(' ', 1)
        except ValueError as exc:
            raise exceptions.AuthenticationFailed('Invalid authorization header') from exc

        if keyword != self.keyword:
            return None

        try:
            payload = decode_token(token)
            user = User.objects.get(id=payload['user_id'])
        except Exception as exc:  # noqa: BLE001
            raise exceptions.AuthenticationFailed('Invalid or expired token') from exc

        return user, token

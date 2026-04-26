import base64
import hashlib
import hmac
import json
import time

from django.conf import settings


def _b64encode(data):
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()


def _b64decode(data):
    padding = '=' * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def encode_token(payload, expires_in=60 * 60 * 24):
    header = {'alg': 'HS256', 'typ': 'JWT'}
    body = {**payload, 'exp': int(time.time()) + expires_in}
    signing_input = f"{_b64encode(json.dumps(header).encode())}.{_b64encode(json.dumps(body).encode())}"
    signature = hmac.new(settings.SECRET_KEY.encode(), signing_input.encode(), hashlib.sha256).digest()
    return f'{signing_input}.{_b64encode(signature)}'


def decode_token(token):
    header, payload, signature = token.split('.')
    signing_input = f'{header}.{payload}'
    expected = _b64encode(hmac.new(settings.SECRET_KEY.encode(), signing_input.encode(), hashlib.sha256).digest())

    if not hmac.compare_digest(signature, expected):
        raise ValueError('Invalid signature')

    data = json.loads(_b64decode(payload).decode())
    if data.get('exp', 0) < int(time.time()):
        raise ValueError('Token expired')
    return data

from urllib.parse import urlparse


class SimpleCORSMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'OPTIONS':
            from django.http import HttpResponse

            response = HttpResponse(status=200)
        else:
            response = self.get_response(request)
        origin = request.headers.get('Origin')
        parsed_origin = urlparse(origin) if origin else None
        is_local_dev_origin = parsed_origin and parsed_origin.scheme in {'http', 'https'} and parsed_origin.hostname in {
            'localhost',
            '127.0.0.1',
        }

        if is_local_dev_origin:
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'

        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        return None

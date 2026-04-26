import json

from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path

from .views import get_analytics_summary


def analytics_dashboard_view(request):
    analytics_data = get_analytics_summary()
    context = {
        **admin.site.each_context(request),
        'title': 'Reports and Analytics',
        'analytics': analytics_data,
        'analytics_json': json.dumps(analytics_data, default=str),
    }
    return TemplateResponse(request, 'admin/analytics_dashboard.html', context)


def get_admin_urls(original_get_urls):
    def wrapped_get_urls():
        custom_urls = [
            path(
                'analytics/',
                admin.site.admin_view(analytics_dashboard_view),
                name='analytics-dashboard',
            ),
        ]
        return custom_urls + original_get_urls()

    return wrapped_get_urls


admin.site.get_urls = get_admin_urls(admin.site.get_urls)

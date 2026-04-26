from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
from rest_framework import permissions, response
from rest_framework.views import APIView

from orders.models import OrderItem, Order


def get_analytics_summary():
    revenue = Order.objects.aggregate(total_revenue=Sum('total'))['total_revenue'] or 0
    orders_count = Order.objects.count()
    revenue_over_time = (
        Order.objects.annotate(order_date=TruncDate('created_at'))
        .values('order_date')
        .annotate(revenue=Sum('total'), orders=Count('id'))
        .order_by('order_date')
    )
    top_products = (
        OrderItem.objects.values('product_name')
        .annotate(quantity_sold=Sum('quantity'))
        .order_by('-quantity_sold')[:5]
    )

    return {
        'total_sales': revenue,
        'number_of_orders': orders_count,
        'revenue_over_time': [
            {
                'date': item['order_date'],
                'revenue': item['revenue'],
                'orders': item['orders'],
            }
            for item in revenue_over_time
        ],
        'top_selling_products': list(top_products),
    }


class AnalyticsSummaryView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return response.Response(get_analytics_summary())

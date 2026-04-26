from django.urls import path

from .views import AdminOrderStatusView, CheckoutView, OrderDetailView, OrderListView

urlpatterns = [
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('', OrderListView.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('admin/<int:pk>/status/', AdminOrderStatusView.as_view(), name='admin-order-status'),
]

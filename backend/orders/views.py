from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, response
from rest_framework.views import APIView

from .models import Order
from .serializers import CheckoutSerializer, OrderSerializer


class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return response.Response(OrderSerializer(order).data, status=201)


class OrderListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')


class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')


class AdminOrderStatusView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        status_value = request.data.get('status')
        valid = {choice[0] for choice in Order.STATUS_CHOICES}

        if status_value not in valid:
            return response.Response({'detail': 'Invalid status.'}, status=400)

        order.status = status_value
        order.save(update_fields=['status'])
        return response.Response(OrderSerializer(order).data)

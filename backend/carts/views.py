from django.shortcuts import get_object_or_404
from rest_framework import permissions, response, status
from rest_framework.views import APIView

from catalog.models import Product

from .models import Cart, CartItem
from .serializers import AddCartItemSerializer, CartSerializer, UpdateCartItemSerializer


def get_or_create_active_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user, checked_out=False)
    return cart


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = get_or_create_active_cart(request.user)
        return response.Response(CartSerializer(cart).data)


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(Product, pk=serializer.validated_data['product_id'], active=True)
        quantity = serializer.validated_data['quantity']
        cart = get_or_create_active_cart(request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'quantity': quantity})

        if not created:
            quantity += item.quantity

        if quantity > product.stock_quantity:
            return response.Response({'detail': 'Requested quantity exceeds available stock.'}, status=status.HTTP_400_BAD_REQUEST)

        item.quantity = quantity
        item.save()
        return response.Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)


class UpdateCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = get_or_create_active_cart(request.user)
        item = get_object_or_404(CartItem, pk=pk, cart=cart)

        if serializer.validated_data['quantity'] > item.product.stock_quantity:
            return response.Response({'detail': 'Requested quantity exceeds available stock.'}, status=status.HTTP_400_BAD_REQUEST)

        item.quantity = serializer.validated_data['quantity']
        item.save()
        return response.Response(CartSerializer(cart).data)


class RemoveCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        cart = get_or_create_active_cart(request.user)
        item = get_object_or_404(CartItem, pk=pk, cart=cart)
        item.delete()
        return response.Response(CartSerializer(cart).data)

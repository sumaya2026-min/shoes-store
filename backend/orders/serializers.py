import uuid

from django.db import transaction
from rest_framework import serializers

from accounts.models import Address
from carts.models import Cart

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'unit_price', 'quantity', 'line_total']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'status',
            'payment_method',
            'subtotal',
            'total',
            'shipping_full_name',
            'shipping_phone',
            'shipping_line1',
            'shipping_line2',
            'shipping_city',
            'shipping_country',
            'shipping_postal_code',
            'created_at',
            'items',
        ]


class CheckoutSerializer(serializers.Serializer):
    address_id = serializers.IntegerField()
    payment_method = serializers.CharField(default='mock')

    def validate_address_id(self, value):
        user = self.context['request'].user
        if not Address.objects.filter(id=value, user=user).exists():
            raise serializers.ValidationError('Address not found.')
        return value

    @transaction.atomic
    def create(self, validated_data):
        user = self.context['request'].user
        cart = Cart.objects.prefetch_related('items__product').get(user=user, checked_out=False)
        cart_items = list(cart.items.all())

        if not cart_items:
            raise serializers.ValidationError('Cart is empty.')

        address = Address.objects.get(id=validated_data['address_id'], user=user)
        subtotal = 0
        order = Order.objects.create(
            user=user,
            order_number=f'ORD-{uuid.uuid4().hex[:10].upper()}',
            payment_method=validated_data['payment_method'],
            subtotal=0,
            total=0,
            shipping_full_name=address.full_name,
            shipping_phone=address.phone,
            shipping_line1=address.line1,
            shipping_line2=address.line2,
            shipping_city=address.city,
            shipping_country=address.country,
            shipping_postal_code=address.postal_code,
        )

        for item in cart_items:
            product = item.product
            if item.quantity > product.stock_quantity:
                raise serializers.ValidationError(f'Insufficient stock for {product.name}.')

            line_total = product.price * item.quantity
            subtotal += line_total
            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name,
                unit_price=product.price,
                quantity=item.quantity,
                line_total=line_total,
            )
            product.stock_quantity -= item.quantity
            product.save(update_fields=['stock_quantity'])

        order.subtotal = subtotal
        order.total = subtotal
        order.save(update_fields=['subtotal', 'total'])
        cart.checked_out = True
        cart.save(update_fields=['checked_out'])
        cart.items.all().delete()
        return order

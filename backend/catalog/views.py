from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from django.db.models import Q

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.select_related('category').filter(active=True)
        category = self.request.query_params.get('category')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        available = self.request.query_params.get('available')
        search = self.request.query_params.get('search')
        ordering = self.request.query_params.get('ordering')

        if category:
            queryset = queryset.filter(Q(category__slug=category) | Q(category__name__iexact=category))
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if available == 'true':
            queryset = queryset.filter(stock_quantity__gt=0)
        if available == 'false':
            queryset = queryset.filter(stock_quantity=0)
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

        if ordering == 'price':
            queryset = queryset.order_by('price')
        elif ordering == '-price':
            queryset = queryset.order_by('-price')
        elif ordering == 'newest':
            queryset = queryset.order_by('-created_at')

        return queryset.distinct()


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializer

    def get_object(self):
        value = self.kwargs['slug']
        queryset = self.get_queryset()
        if value.isdigit():
            return get_object_or_404(queryset, pk=int(value))
        return get_object_or_404(queryset, slug=value)


class AdminProductCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ProductSerializer


class AdminProductUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

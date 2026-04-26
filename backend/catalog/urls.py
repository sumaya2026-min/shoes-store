from django.urls import path

from .views import (
    AdminProductCreateView,
    AdminProductUpdateDeleteView,
    CategoryListView,
    ProductDetailView,
    ProductListView,
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('admin/products/', AdminProductCreateView.as_view(), name='admin-product-create'),
    path('admin/products/<int:pk>/', AdminProductUpdateDeleteView.as_view(), name='admin-product-update-delete'),
]

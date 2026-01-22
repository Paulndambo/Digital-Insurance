from rest_framework import serializers
from apps.schemes.models import Scheme
from apps.products.serializers import ProductSerializer

class SchemeSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Scheme
        fields = "__all__"
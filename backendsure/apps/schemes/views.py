from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import generics, status
from apps.core.constants import SchemeTypes

from apps.schemes.models import Scheme
from apps.schemes.serializers import SchemeSerializer

# Create your views here.
class SchemeAPIView(generics.ListCreateAPIView):
    queryset= Scheme.objects.all()
    serializer_class = SchemeSerializer
    
    def post(self, request, *args, **kwargs):
        print(SchemeTypes.choices())
        return super().post(request, *args, **kwargs)
    

class SchemeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Scheme.objects.all()
    serializer_class = SchemeSerializer
    
    lookup_field = "pk"
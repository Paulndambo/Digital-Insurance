from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from apps.sales.serializers import PolicyPurchaseSerializer
from apps.sales.retail_purchase.retail_purchase import RetailPolicyPurchaseService
from apps.sales.group_purchase.group_purchase import GroupPolicyPurchaseService
from apps.sales.credit_life_purchase.credit_life_purchase import CreditLifePolicyPurchaseService
# Create your views here.
class PolicyPurchaseAPIView(generics.CreateAPIView):
    serializer_class = PolicyPurchaseSerializer
    
    def post(self, request, *args, **kwargs):
        data = request.data 
        serializer = self.serializer_class(data=data)
        
        if serializer.is_valid(raise_exception=True):
            RetailPolicyPurchaseService(data=data).execute()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
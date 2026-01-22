from rest_framework import serializers
from apps.payments.models import (
    Premium, PayerDetail, Payment
)

class PremiumSerializer(serializers.ModelSerializer):
    policy_number = serializers.SerializerMethodField()
    class Meta:
        model = Premium
        fields = "__all__"

    def get_policy_number(self, obj):
        return obj.policy.policy_number

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"



class PayerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayerDetail
        fields = "__all__"
from rest_framework import serializers

class GadgetPolicyPurchaseSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    premium = serializers.DecimalField(max_digits=100, decimal_places=2)
    cover_amount = serializers.DecimalField(max_digits=100, decimal_places=2)
    pricing = serializers.IntegerField()
    cover_type = serializers.CharField(max_length=255)
    policy_owner = serializers.JSONField(default=dict)
    devices = serializers.JSONField(default=list)
    payment_details = serializers.JSONField(default=dict)
from rest_framework import serializers

class PolicyPurchaseSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    product_type = serializers.CharField(max_length=255, required=False, allow_blank=True)
    agent_number = serializers.CharField(max_length=255, required=False, allow_blank=True)

    members = serializers.JSONField(required=False, allow_null=True)
    dependents = serializers.JSONField(required=False, allow_null=True)
    beneficiaries = serializers.JSONField(required=False, allow_null=True)
    payment_details = serializers.JSONField(required=False, allow_null=True)
    creditors = serializers.JSONField(required=False, allow_null=True)

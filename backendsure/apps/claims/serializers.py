from rest_framework import serializers

from apps.claims.models import Claim, ClaimDocument

class ClaimDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClaimDocument
        fields = "__all__"


class ClaimSerializer(serializers.ModelSerializer):
    policy_number = serializers.SerializerMethodField()
    
    class Meta:
        model = Claim
        fields = "__all__"

    
    def get_policy_number(self, obj):
        return obj.policy.policy_number


class ClaimDetailSerializer(serializers.ModelSerializer):
    policy_number = serializers.SerializerMethodField()
    claim_documents = ClaimDocumentSerializer(many=True)
    device_outlet_name = serializers.SerializerMethodField()
    claim_owner = serializers.SerializerMethodField()

    class Meta:
        model = Claim
        fields = "__all__"

    
    def get_policy_number(self, obj):
        return obj.policy.policy_number
    

    def get_device_outlet_name(self, obj):
        return obj.device_outlet.name if obj.device_outlet else ""
    
    def get_claim_owner(self, obj):
        return f"{obj.policy.policy_owner.first_name} {obj.policy.policy_owner.last_name}" if obj.policy.policy_owner else "Group Claim"
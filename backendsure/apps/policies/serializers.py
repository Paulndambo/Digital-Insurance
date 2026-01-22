from rest_framework import serializers

from apps.policies.models import (
    Policy, PolicyStatusUpdate
)
from apps.gadgets.serializers import InsuredGadgetSerializer, GadgetPricingSerializer
from apps.payments.serializers import PremiumSerializer
from apps.claims.serializers import ClaimSerializer


class PolicyStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyStatusUpdate
        fields = "__all__"


class PoliciesSerializer(serializers.ModelSerializer):
    policy_owner_name = serializers.ReadOnlyField()
    class Meta:
        model = Policy
        fields = "__all__"



class PoliciesDetailSerializer(serializers.ModelSerializer):
    policy_gadgets = InsuredGadgetSerializer(many=True)
    policy_status_updates = PolicyStatusUpdateSerializer(many=True)
    policy_owner_name = serializers.ReadOnlyField()
    policypremiums = PremiumSerializer(many=True)
    gadget_pricing = GadgetPricingSerializer()
    policy_claims = ClaimSerializer(many=True)
    
    class Meta:
        model = Policy
        fields = "__all__"


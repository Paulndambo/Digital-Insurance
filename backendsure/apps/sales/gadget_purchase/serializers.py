from decimal import Decimal

from rest_framework import serializers


class GadgetPolicyPurchaseSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    premium = serializers.DecimalField(
        max_digits=100, decimal_places=2, required=False, default=Decimal("0")
    )
    cover_amount = serializers.DecimalField(
        max_digits=100, decimal_places=2, required=False, default=Decimal("0")
    )
    pricing = serializers.IntegerField()
    cover_type = serializers.CharField(max_length=255)
    policy_owner = serializers.JSONField(default=dict)
    devices = serializers.JSONField(default=list)
    payment_details = serializers.JSONField(default=dict)
    additional_information = serializers.JSONField(required=False, default=dict)
    beneficiary = serializers.JSONField(required=False, default=dict)

    def validate_devices(self, value):
        if not isinstance(value, list) or len(value) < 1:
            raise serializers.ValidationError("Provide at least one device.")
        required_keys = (
            "device_type",
            "device_brand",
            "device_model",
            "purchase_date",
            "device_cost",
        )
        for i, device in enumerate(value):
            if not isinstance(device, dict):
                raise serializers.ValidationError(f"Device {i + 1} must be an object.")
            missing = [k for k in required_keys if device.get(k) in (None, "")]
            if missing:
                raise serializers.ValidationError(
                    f"Device {i + 1} is missing required fields: {', '.join(missing)}."
                )
            serial = str(device.get("serial_number") or "").strip()
            imei = str(device.get("imei_number") or "").strip()
            if not serial and not imei:
                raise serializers.ValidationError(
                    f"Device {i + 1} requires a serial number or IMEI."
                )
            try:
                cost = Decimal(str(device.get("device_cost")))
            except Exception:
                raise serializers.ValidationError(
                    f"Device {i + 1} has an invalid device_cost."
                )
            if cost <= 0:
                raise serializers.ValidationError(
                    f"Device {i + 1} device_cost must be greater than zero."
                )
        return value
import json

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from apps.core.data_maps import LoggedInUserDataMap


from apps.users.models import User, Membership


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "phone_number", "role", "first_name", "last_name")
        read_only_fields = ("id",)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")
        

        user = (
            User.objects.filter(email=username_or_email).first()
            or User.objects.filter(username=username_or_email).first()
        )

        if not user:
            raise serializers.ValidationError("User not found.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        # OTP is valid, issue tokens
        data = super().get_token(user)
        access_token = str(data.access_token)
        refresh_token = str(data)


        return LoggedInUserDataMap(
            id=user.id,
            access=access_token,
            refresh=refresh_token,
            username=user.username,
            email=user.email,
            role=user.role,
            name=f"{user.first_name} {user.last_name}",
            phone_number=user.phone_number,
            gender=user.gender
            
        ).__dict__


class MembershipSerializer(serializers.ModelSerializer):
    policy_number = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    id_number = serializers.SerializerMethodField()
    gender = serializers.SerializerMethodField()

    class Meta:
        model = Membership
        fields = "__all__"

    def get_policy_number(self, obj):
        return obj.policy.policy_number
    
    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    

    def get_phone_number(self, obj):
        return obj.user.phone_number
    
    
    def get_id_number(self, obj):
        return obj.user.id_number
    

    def get_gender(self, obj):
        return obj.user.gender
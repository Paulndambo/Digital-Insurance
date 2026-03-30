from typing import Dict, Any

from apps.policies.models import Policy
from apps.notifications.models import NotificationStorage, NotificationLog
from apps.users.models import Membership

from notifications.mixins import SendMessage

def create_policy_purchased_notification(policy: Policy):
    try:
        # Create a notification message
        notification = NotificationStorage.objects.filter(policy=policy, status="Pending", notification_category="New Policy").first()

        if not notification:
            return

        policy_memberships = Membership.objects.filter(policy=policy)
        if not policy_memberships.exists():
            return
        
        # Send the notification to the user
        for membership in policy_memberships:
            send_message = SendMessage()
            context_data: Dict[str, Any] = {
                "subject": "Congratulations on Your New Policy!",
                "policy_number": policy.policy_number,
                "product_name": policy.product.name,
                "purchase_date": policy.created_at.strftime("%B %d, %Y"),
                "customer_name": membership.user.get_full_name(),
            }

            send_message.send_mail(
                context_data=context_data,
                recipient_list=[membership.user.email],
                template="policy_purchased"
            )

            NotificationLog.objects.create(
                user=membership.user,
                notification=notification,
                status="Sent"
            )
        
        # Update the notification status to "Sent"
        notification.status = "Sent"
        notification.save()
    except Exception as e:
        # Handle any exceptions that occur during the notification process
        print(f"Error creating policy purchased notification: {str(e)}")

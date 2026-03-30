from apps.notifications.mixins import SendMessage
from apps.users.models import User


def user_account_activation_notification(user: User):
    try:
        # Create a notification message
        send_message = SendMessage()
        context_data = {
            "subject": "Your Account Has Been Created!",
            "customer_name": user.get_full_name(),
            "activation_link": f"http://localhost:5173/activate?token={user.token}"  # This should be the actual activation link
        }

        send_message.send_mail(
            context_data=context_data,
            recipient_list=[user.email],
            template="account_activation"
        )
    except Exception as e:
        # Handle any exceptions that occur during the notification process
        print(e)
        print(f"Error creating account activation notification: {str(e)}")


def user_account_activation_success_notification(user: User):
    try:
        # Create a notification message
        send_message = SendMessage()
        context_data = {
            "subject": "Your Account Has Been Activated!",
            "customer_name": user.get_full_name(),
        }

        send_message.send_mail(
            context_data=context_data,
            recipient_list=[user.email],
            template="account_activation_success"
        )
    except Exception as e:
        # Handle any exceptions that occur during the notification process
        print(e)
        print(f"Error creating account activation success notification: {str(e)}")
import copy
import datetime
import io
import json
from datetime import date
from urllib.parse import urlencode
from typing import List, Optional, Dict, Any

import requests
from django.conf import settings
from django.core.files import File
from django.core.mail import EmailMultiAlternatives
from django.db.models import F
from django.template.loader import get_template
from django.utils.html import strip_tags


class SendMessage(object):
    def __init__(self):
        pass

    #def _create_in_system_message(self, subject, content="", other_recipients=list()):
    #    messages = list()
    #    for user_id in User.objects.filter(
    #        pk__in=other_recipients, notification_type__name="in_system"
    #    ).values_list("id", flat=True):
    #        messages.append(
    #            Message(
    #                user_id=user_id,
    #                subject=subject,
    #                message=content,
    #                message_type="system",
    #            )
    #        )

    #    Message.objects.bulk_create(messages)

    def send_mail(self, context_data: Dict[str, Any], recipient_list: List[str], template: Optional[str]=None):
        try:
            from_email = settings.SITE_EMAIL
            context_data["email_date"] = str(date.today())

            html_message = get_template("messages/{0}.html".format(template)).render(context_data)
            message = strip_tags(html_message)

            subject = "{0} - {1}".format(settings.EMAIL_SUBJECT, context_data["subject"])

            headers = {
                "Reply-To": "digicafeteria@gmail.com",
                "From": "digicafeteria@gmail.com",
            }

            email = EmailMultiAlternatives(
                subject=subject,
                body=message,
                from_email=from_email,
                to=recipient_list,
                # **self.__email_additional_configs(),
                headers=headers,
            )
            email.attach_alternative(html_message, "text/html")

            if "attached_files" in context_data:
                for attached_file in context_data["attached_files"]:
                    email.attach(
                        attached_file["name"],
                        attached_file["main_file"],
                        attached_file["media_type"],
                    )

            email.send()
        except Exception as e:
            print(f"_send_email >> error in sending email > {e}")
            raise e
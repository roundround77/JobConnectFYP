from django.core.mail import EmailMessage
import os

class Util:
    @staticmethod
    def send_email(data):
        # Create an EmailMessage instance with the provided data
        email = EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),  # Sender's email from environment variable
            to=[data['to_email']]  # Recipient's email
        )

        # Send the email
        email.send()

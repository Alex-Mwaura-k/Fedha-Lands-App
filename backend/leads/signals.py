import json 
import os
import threading
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from django.utils.html import strip_tags

# --- WEBPUSH IMPORTS ---
from webpush.models import PushInformation
from webpush.utils import send_to_subscription

# Import Models
from properties.models import Property
from blog.models import BlogPost
from careers.models import Job
from .models import Subscriber, CustomBroadcast

# =========================================================
# CONFIGURATION (READ FROM ENVIRONMENT)
# =========================================================
# Fallback to local only for development; Render will provide the real URLs
WEBSITE_URL = os.environ.get('WEBSITE_URL', 'http://localhost:5173')
BACKEND_URL = os.environ.get('BACKEND_URL', 'http://127.0.0.1:8000')

# =========================================================
# HELPER 1: THEMED EMAIL SENDER
# =========================================================
def send_html_email(subject, title, preview_text, link_url, link_text, subscribers):
    color_red = "#ff0000"
    color_btn_red = "#D10000"
    color_black = "#000000"

    for email in subscribers:
        unsubscribe_url = f"{BACKEND_URL}/api/unsubscribe/?email={email}"
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f4f4;">
            <div style="background-color: {color_black}; padding: 30px 20px; text-align: center; border-bottom: 3px solid {color_red};">
                <h1 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase;">FEDHA LAND VENTURES</h1>
            </div>
            <div style="background-color: #ffffff; padding: 40px 30px 30px 30px; border: 1px solid #e0e0e0; border-top: none;">
                <h3 style="color: {color_red}; margin-top: 0; font-size: 18px;">{title}</h3>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <div style="font-size: 16px; color: #444; white-space: pre-wrap;">{preview_text}</div>
                <div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
                    <a href="{link_url}" style="background-color: {color_btn_red}; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 12px; display: inline-block;">
                        {link_text}
                    </a>
                </div>
                <p style="margin-bottom: 5px; color: #888; font-size: 14px;">Best Regards,</p>
                <strong style="color: #000000; font-size: 12px;">Fedha Management Team</strong>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 11px; color: #999; text-align: center;">
                    If you wish to stop receiving these, <a href="{unsubscribe_url}">unsubscribe here</a>.
                </p>
            </div>
        </body>
        </html>
        """
        plain_message = strip_tags(html_message)
        try:
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [email], html_message=html_message, fail_silently=False)
        except Exception as e:
            print(f"❌ Failed to email {email}: {e}")

# =========================================================
# HELPER 2: PWA PUSH SENDER
# =========================================================
def send_pwa_broadcast(title, body, url):
    payload_data = {
        "head": title,
        "body": body,
        "icon": "/static/images/fedha-logo-192.png", 
        "badge": "/static/images/fedha-badge-72.png", 
        "url": url
    }
    
    payload_json = json.dumps(payload_data)
    devices = PushInformation.objects.all()
    
    if devices.exists():
        for device in devices:
            try:
                send_to_subscription(device.subscription, payload_json)
            except Exception as e:
                print(f"❌ PUSH FAILED for device: {e}") 

# =========================================================
# SIGNAL RECEIVERS
# =========================================================

@receiver(post_save, sender=CustomBroadcast)
def send_custom_broadcast(sender, instance, created, **kwargs):
    if created:
        def task():
            try:
                target_url = instance.link if instance.link else WEBSITE_URL
                send_pwa_broadcast(instance.title, instance.message, target_url)
            except Exception as e:
                print(f"🚀 Broadcast Error: {e}")
        threading.Thread(target=task).start()

@receiver(post_save, sender=Subscriber)
def send_subscriber_push(sender, instance, created, **kwargs):
    if created:
        def task():
            try:
                send_pwa_broadcast(
                    title="New Subscriber", 
                    body=f"{instance.email} just subscribed!", 
                    url=f"{BACKEND_URL}/admin/leads/subscriber/"
                )
            except Exception as e:
                print(f"🔔 Subscriber Signal Error: {e}")
        threading.Thread(target=task).start()

@receiver(post_save, sender=Property)
def send_new_property_notification(sender, instance, created, **kwargs):
    if created:
        def task():
            try:
                subscribers = Subscriber.objects.filter(is_active=True).values_list('email', flat=True)
                # Format price with commas for the email
                formatted_price = "{:,}".format(instance.price)
                email_preview = f"We have a new listing in <strong>{instance.location}</strong>.<br>Price: <strong>KES {formatted_price}</strong><br><br>{instance.description[:120]}..."
                property_link = f"{WEBSITE_URL}/property/{instance.slug}"

                if subscribers:
                    send_html_email(f"🏠 Just Listed: {instance.title}", f"New Opportunity in {instance.location}", email_preview, property_link, "View Property", subscribers)

                send_pwa_broadcast("🔥 New Listing!", f"{instance.title} @ {instance.location}. KES {formatted_price}", property_link)
            except Exception as e:
                print(f"🏠 Property Signal Error: {e}")
        threading.Thread(target=task).start()

@receiver(post_save, sender=BlogPost)
def send_new_blog_notification(sender, instance, created, **kwargs):
    if created:
        def task():
            try:
                subscribers = Subscriber.objects.filter(is_active=True).values_list('email', flat=True)
                blog_link = f"{WEBSITE_URL}/blog/{instance.slug}"
                
                if subscribers:
                    # Strip HTML from content for the short preview
                    clean_content = strip_tags(instance.content)[:180]
                    send_html_email(f"📰 Real Estate Insights: {instance.title}", instance.title, f"{clean_content}... Read the full guide on our website.", blog_link, "Read Article", subscribers)

                send_pwa_broadcast("📰 New Article", f"{instance.title} - Read now on Fedha App.", blog_link)
            except Exception as e:
                print(f"📰 Blog Signal Error: {e}")
        threading.Thread(target=task).start()

@receiver(post_save, sender=Job)
def send_new_job_notification(sender, instance, created, **kwargs):
    if created:
        def task():
            try:
                subscribers = Subscriber.objects.filter(is_active=True).values_list('email', flat=True)
                if subscribers:
                    send_html_email(f"💼 We are Hiring: {instance.title}", f"Join the Team: {instance.title}", f"Location: {instance.location}<br>Deadline: {instance.deadline}<br><br>Are you the right fit? Apply today.", f"{WEBSITE_URL}/careers", "View Job Description", subscribers)

                send_pwa_broadcast("💼 We're Hiring!", f"Opening for {instance.title}. Apply now.", f"{WEBSITE_URL}/careers")
            except Exception as e:
                print(f"💼 Job Signal Error: {e}")
        threading.Thread(target=task).start()
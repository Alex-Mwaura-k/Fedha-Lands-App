from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.core.mail import send_mail
from django.conf import settings
from django.utils.html import strip_tags

# --- IMPORT WEBPUSH MODELS ---
from webpush.models import PushInformation 

# --- IMPORT YOUR MODELS ---
from .models import Contact, Subscriber, SiteVisit, CustomBroadcast, EmailBlast

# --- CONFIGURATION ---
BACKEND_URL = "http://127.0.0.1:8000"

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'email', 'date_sent')
    search_fields = ('name', 'email', 'subject', 'phone')
    list_filter = ('date_sent',)
    readonly_fields = ('name', 'email', 'phone', 'subject', 'message', 'date_sent')
    def has_add_permission(self, request): return False

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'date_subscribed', 'is_active')
    search_fields = ('email',)
    list_filter = ('is_active',)

@admin.register(SiteVisit)
class SiteVisitAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone', 'property_name', 'visit_date', 'status', 'print_receipt')
    list_filter = ('status', 'visit_date')
    search_fields = ('first_name', 'last_name', 'phone', 'property_name')
    list_editable = ('status',) 
    def print_receipt(self, obj):
        url = reverse('visit_receipt', args=[obj.id])
        return format_html('<a class="button" href="{}" target="_blank" style="background-color: #333; color: white; padding: 5px 10px; border-radius: 5px; text-decoration: none;">🖨️ Print</a>', url)
    print_receipt.short_description = 'Receipt'

@admin.register(CustomBroadcast)
class CustomBroadcastAdmin(admin.ModelAdmin):
    list_display = ('title', 'message', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('title', 'message')

# =========================================================
#  CUSTOM PUSH NOTIFICATION VIEW (FIXED)
# =========================================================
# 1. Unregister the default view safely
try:
    admin.site.unregister(PushInformation)
except admin.sites.NotRegistered:
    pass

# 2. Register your CUSTOM view with the fix
@admin.register(PushInformation)
class PushInfoAdmin(admin.ModelAdmin):
    # This controls what columns you see
    list_display = ('browser_info', 'subscription_status', 'group', 'user')
    
    # FIX: Search inside the 'subscription' relationship, not the main object
    search_fields = ('subscription__browser', 'user__email')

    def browser_info(self, obj):
        # FIX: The browser data is inside 'obj.subscription', not 'obj'
        if obj.subscription:
            return obj.subscription.browser
        return "Unknown Device"
    browser_info.short_description = "Device Details (OS | Res | Timezone)"

    def subscription_status(self, obj):
        return "✅ Active" if obj.subscription else "❌ Inactive"
    subscription_status.short_description = "Status"


@admin.register(EmailBlast)
class EmailBlastAdmin(admin.ModelAdmin):
    list_display = ('subject', 'created_at')
    readonly_fields = ('created_at',)
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        
        if not change:
            # 1. Get all active subscribers
            subscribers = Subscriber.objects.filter(is_active=True)
            
            if subscribers.exists():
                count = 0
                # 2. Loop through each subscriber individually
                for sub in subscribers:
                    # 3. Generate the SPECIFIC link for this user
                    unsubscribe_url = f"{BACKEND_URL}/api/unsubscribe/?email={sub.email}"
                    
                    # --- PROFESSIONAL WHITE LAYOUT (Matching your theme) ---
                    color_red = "#ff0000"
                    color_black = "#000000"
                    
                    html_content = f"""
                    <!DOCTYPE html><html>
                    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f4f4;">
                        <div style="background-color: {color_black}; padding: 30px 20px; text-align: center; border-bottom: 3px solid {color_red};">
                            <h1 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase;">FEDHA LAND VENTURES</h1>
                        </div>
                        
                        <div style="background-color: #ffffff; padding: 40px 30px 30px 30px; border: 1px solid #e0e0e0; border-top: none;">
                            <h3 style="color: {color_red}; margin-top: 0; font-size: 18px;">{obj.subject}</h3>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                            <div style="font-size: 16px; color: #444; white-space: pre-wrap;">{obj.message}</div>
                            <p style="margin-top: 30px; margin-bottom: 5px; color: #888; font-size: 14px;">Best Regards,</p>
                            <strong style="color: #000000; font-size: 12px;">Fedha Management Team</strong>
                        </div>
                        
                        <div style="text-align: center; padding: 30px 20px; background-color: #f4f4f4; color: #999; font-size: 12px;">
                            <p style="margin: 0 0 6px;">Nyongo Plaza, Ruiru | +254 715 113 103</p>
                            <p style="margin: 0 0 6px;">You are receiving this email because you subscribed to our updates.</p>
                            
                            <a href="{unsubscribe_url}" style="color: #444444; text-decoration: underline;">Unsubscribe</a>
                        </div>
                    </body></html>
                    """
                    
                    try:
                        # Send to this ONE subscriber
                        send_mail(obj.subject, strip_tags(html_content), settings.EMAIL_HOST_USER, [sub.email], fail_silently=False, html_message=html_content)
                        count += 1
                    except Exception as e:
                        print(f"Failed to send to {sub.email}: {e}")

                self.message_user(request, f"Email sent to {count} subscribers!")
            else:
                self.message_user(request, "No subscribers found.")
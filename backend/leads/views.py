import os 
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from .models import Contact, Subscriber, SiteVisit
from .serializers import ContactSerializer, SubscriberSerializer, SiteVisitSerializer

# --- 1. CONTACT FORM LOGIC ---
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('-date_sent')
    serializer_class = ContactSerializer

    # PUBLIC: Anyone can POST (Send a message)
    # SECURE: Only Admin can GET (Read messages)
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            
            # --- SECURE EMAIL LOGIC ---
            try:
                subject = f"New Inquiry: {serializer.data.get('subject', 'No Subject')}"
                message = (
                    f"You have received a new message via the website.\n\n"
                    f"Name: {serializer.data.get('name')}\n"
                    f"Email: {serializer.data.get('email')}\n"
                    f"Phone: {serializer.data.get('phone')}\n\n"
                    f"Message:\n{serializer.data.get('message')}"
                )
                from_email = settings.EMAIL_HOST_USER
                
                # RECIPIENT: Reads from .env or defaults to admin email
                admin_email = os.environ.get('VAPID_ADMIN_EMAIL', 'fedhalandventures@gmail.com')
                recipient_list = [admin_email]
                
                send_mail(subject, message, from_email, recipient_list, fail_silently=True)
            except Exception as e:
                print(f"Email sending failed: {e}")
            # --------------------------

            return Response({"message": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- 2. SUBSCRIBER LOGIC ---
class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all().order_by('-date_subscribed')
    serializer_class = SubscriberSerializer
    
    # PUBLIC: Subscribe
    # SECURE: View List
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if Subscriber.objects.filter(email=email).exists():
            return Response({"message": "You are already subscribed!"}, status=status.HTTP_200_OK)
        return super().create(request, *args, **kwargs)

@api_view(['GET'])
@permission_classes([AllowAny])
def unsubscribe_user(request):
    email = request.GET.get('email')
    if not email:
        return Response({"error": "Email required"}, status=400)
    
    subscriber = Subscriber.objects.filter(email=email).first()
    
    # Even if not found, we show success to prevent email fishing
    if subscriber:
        subscriber.is_active = False
        subscriber.save()
        
    return HttpResponse("""
        <div style='font-family: Arial; text-align: center; margin-top: 50px;'>
            <h1 style='color: #dc3545;'>Unsubscribed</h1>
            <p>You have been successfully removed from the Fedha Land Ventures mailing list.</p>
            <a href="https://fedhalandventures.co.ke" style="text-decoration: none; color: blue;">Return to Website</a>
        </div>
    """)

# --- 3. SITE VISIT LOGIC (SECURED) ---
class SiteVisitViewSet(viewsets.ModelViewSet):
    queryset = SiteVisit.objects.all().order_by('-created_at')
    serializer_class = SiteVisitSerializer
    
    # CRITICAL SECURITY FIX:
    # AllowAny for POST (Booking), but IsAuthenticated for GET (Viewing List)
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

@login_required
def site_visit_receipt(request, visit_id):
    visit = get_object_or_404(SiteVisit, pk=visit_id)
    return render(request, 'leads/receipt.html', {'visit': visit})
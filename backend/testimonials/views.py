from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Testimonial, ValidSerial
from .serializers import TestimonialSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.filter(is_approved=True).order_by('-date_submitted')
    serializer_class = TestimonialSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        # 1. Get Title Number
        title_number = request.data.get('titleNumber', '').strip().upper()
        print(f"DEBUG: Received Serial: {title_number}") 

        # 2. Verify Database
        try:
            valid_serial = ValidSerial.objects.get(serial_number=title_number)
        except ValidSerial.DoesNotExist:
            return Response(
                {"error": "Invalid Title Deed/Plot Number. Please check your documents."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. Check usage
        if valid_serial.is_used:
            return Response(
                {"error": "This Title Number has already been used to submit a review."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # 4. Save with Explicit Data
        # We pass the raw request data to the serializer
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # --- THE FIX IS HERE ---
            # We pass 'title_number_used' as an argument to save().
            # This bypasses the read-only check and forces the data into the DB.
            serializer.save(title_number_used=title_number)
            
            # Mark serial as used
            valid_serial.is_used = True
            valid_serial.save()

            return Response(
                {"message": "Review submitted successfully! It is pending approval."}, 
                status=status.HTTP_201_CREATED
            )
        
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
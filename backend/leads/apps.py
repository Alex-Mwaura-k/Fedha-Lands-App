from django.apps import AppConfig

class LeadsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'leads'
    verbose_name = 'Leads & Inquiries'

    def ready(self):
        # This print statement helps us debug. 
        # If you see "Leads Signals Loaded!" in your terminal when the server starts, it works.
        import leads.signals
        print("✅ Leads Signals Loaded Successfully!")
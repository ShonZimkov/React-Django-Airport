from django.contrib import admin
from .models import Adminstrator, Airline_Company, Country, Customer, Flight, Ticket

# Register your models here.
admin.site.register(Flight)
admin.site.register(Airline_Company)
admin.site.register(Ticket)
admin.site.register(Adminstrator)
admin.site.register(Customer)
admin.site.register(Country)

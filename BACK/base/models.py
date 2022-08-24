from random import random
from wsgiref.simple_server import demo_app
from django.db import models
from django.contrib.auth.models import User
import random
 
class Country(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()


# class User_Role(models.Model):
#     id = models.AutoField(primary_key=True)
#     role_name = models.TextField(unique=True)


# class User(models.Model):
#     id = models.AutoField(primary_key=True)
#     username = models.TextField(unique=True)
#     password = models.TextField()
#     email = models.TextField(unique=True)
#     user_role = models.ForeignKey(User_Role,on_delete=models.CASCADE)


class Airline_Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    country_id = models.ForeignKey(Country,on_delete=models.CASCADE)
    user_id = models.OneToOneField(User,on_delete=models.CASCADE)


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.TextField()
    last_name = models.TextField()
    address = models.TextField()
    phone_no = models.TextField(unique=True)
    credit_card_no = models.TextField(unique=True)
    user_id = models.OneToOneField(User,on_delete=models.CASCADE)


class Flight(models.Model):
    id = models.AutoField(primary_key=True)
    airline_company_id = models.ForeignKey(Airline_Company,on_delete=models.CASCADE)
    origin_country_id = models.ForeignKey(Country,on_delete=models.CASCADE,related_name='origin')
    destination_country_id = models.ForeignKey(Country,on_delete=models.CASCADE,related_name='destination')
    departure_time = models.DateTimeField(null=True, blank=True, default=None)
    landing_time = models.DateTimeField(null=True, blank=True, default=None)
    remaining_tickets = models.IntegerField()
    
 
class FlightAPI(models.Model):
    id = models.AutoField(primary_key=True)
    airline_company_id = models.TextField()
    origin_country_id = models.TextField()
    destination_country_id = models.TextField()
    departure_time = models.DateTimeField(null=True, blank=True, default=None)
    landing_time = models.DateTimeField(null=True, blank=True, default=None)
    remaining_tickets = models.IntegerField()

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    flight_id = models.ForeignKey(Flight,on_delete=models.CASCADE)
    customer_id = models.ForeignKey(Customer,on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)

    class Meta:
        unique_together = ('flight_id', 'customer_id',)
 
 
class Adminstrator(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.TextField()
    last_name = models.TextField()
    user_id = models.ForeignKey(User,on_delete=models.CASCADE, unique=True)

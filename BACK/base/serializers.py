from dataclasses import field, fields
from django.contrib.auth.models import User
from .models import Airline_Company, Country, Customer, Flight, FlightAPI
from rest_framework import serializers


class FLightAPI_Ser(serializers.ModelSerializer):
    class Meta:
        model=FlightAPI
        fields = '__all__'


def getAirSer(Airline):
       return {
            "id":Airline.id,
            "name":Airline.name,
            "country":Airline.country_id.name,
            "user":{
                "username":Airline.user_id.username,
                "Airline_permit":Airline.user_id.is_staff
            }
            }
    
def getFlightSer(Flight):
    dep =Flight.departure_time
    land = Flight.landing_time
    return {
            "id":Flight.id,
            "airline_company":Flight.airline_company_id.name,
            "origin_country":Flight.origin_country_id.name,
            "destination_country":Flight.destination_country_id.name,
            "departure_time":dep.strftime("%Y-%m-%d, %H:%M"),
            "landing_time":land.strftime("%Y-%m-%d, %H:%M"),
            "remaining_tickets":Flight.remaining_tickets
            }

def getFlightapiSer(Flight):
       return {
            "flight_date":Flight.flight_date,
            }

def getCustomerSer(customer):
    return {
        "id":customer.id,
        "first_name":customer.first_name,
        "last_name":customer.last_name,
        "address":customer.address,
        "phone_no":customer.phone_no,
        "credit_card_no":customer.credit_card_no,
        "sign_up":customer.user_id.is_active,
        "user_id":customer.user_id.id
    }
    
def getSuperUserSer(user):
        return {
            "id":user.id,
            "username":user.username,
            "password":user.password,
            "email":user.email,
            "superuser_permit" :user.is_superuser,
            "airline_permit" : user.is_staff,
            "customer_permit" : user.is_active
        }

def getStaffUserSer(user):
        return {
            "id":user.id,
            "username":user.username,
            "password":user.password,
            "email":user.email,
            "airline_permit" : user.is_staff,
        }

def getCustUserSer(user):
        return {
            "id":user.id,
            "username":user.username,
            "password":user.password,
            "email":user.email,
            "customer_permit" : user.is_active
        }

def getCountrySer(country):
    return {
        "id":country.id,
        "name":country.name
    }
    
def getTicketSer(ticket):
    return {
        "id":ticket.id,
        "flight_id":ticket.flight_id.id,
        "customer":ticket.customer_id.first_name,
        "amount": ticket.amount
    }

def getAdminSer(admin):
    return {
        "id":admin.id,
        "first_name":admin.first_name,
        "last_name":admin.last_name,
        "user_id":admin.user_id.id
    }


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model =Flight
        fields ='__all__'


    def getCountry(self,obj):
        return {
            "id":obj.id,
            "name":obj.name
        }

    def getUser_Role(self,obj):
        return{
            "id":obj.id,
            "role_name":obj.role_name
        }

    def getUser(self,obj):
        return {
            "id":obj.id,
            "username":obj.username,
            "password":obj.password,
            "email":obj.email,
            "user_role" : self.getUser_Role(obj.user_role),
        }

    def getAirCompany(self,obj):
        return {
            "id" : obj.id,
            "name":   obj.name,
            "country_id":   self.getCountry(obj.country_id),
            "user_id":  self.getUser(obj.user_id)
            }
        

    def getFlight(self,obj):
        return  {
            "id":obj.id,
            "airline_company_id": self.getAirCompany(obj.airline_company_id),
            "origin_country_id": self.getCountry(obj.origin_country_id),
            "destination_country_id": self.getCountry(obj.destination_country_id),
            "departure_time":obj.departure_time,
            "landing_time":obj.landing_time,
            "remaining_tickets":obj.remaining_tickets
        }

class AirCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model =Airline_Company
        fields ='__all__'

    def getCountry(self,obj):
        return {
            "id":obj.id,
            "name":obj.name
        }

    def getUser_Role(self,obj):
        return{
            "id":obj.id,
            "role_name":obj.role_name
        }

    def getUser(self,obj):
        return {
            "id":obj.id,
            "username":obj.username,
            "password":obj.password,
            "email":obj.email,
            "is_staff" : obj.is_staff
        }

    def getAirCompany(self,obj):
        return {
            "id" : obj.id,
            "name":   obj.name,
            "country_id":   self.getCountry(obj.country_id),
            "user_id":  self.getUser(obj.user_id)
            }
    
        
        

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model =Country
        fields ='__all__'

    def getCountry(self,obj):
         return {
            "id":   obj.id,
            "name":   obj.name,
            }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields ='__all__'

    # def getUser_Role(self,obj):
    #     return{
    #         "id":obj.id,
    #         "role_name":obj.role_name
    #     }

    def getUser(self,obj):
        return{
            "username":obj.username,
            "password":obj.password,
            "email":obj.email,
            "is_staff" : obj.is_staff,
            "is_active":obj.is_active
        }
        

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model =Customer
        fields ='__all__'

    def getUser_Role(self,obj):
        return{
            "id":obj.id,
            "role_name":obj.role_name
        }

    def getUser(self,obj):
        return{
            "username":obj.username,
            "password":obj.password,
            "email":obj.email,
            "is_staff" : obj.is_staff
        }

    def getCustomer(self,obj):
        return{
            "id":obj.id,
            "first_name":obj.first_name,
            "last_name":obj.last_name,
            "address":obj.address,
            "phone_no":obj.phone_no,
            "credit_card_no":obj.credit_card_no,
            "user_id": self.getUser(obj.user_id)
        }

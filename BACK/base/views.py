from random import  random
from django.utils import timezone
import datetime
from django.contrib.auth import logout
from django.http import JsonResponse
from .serializers import  getAdminSer, getAirSer, getCountrySer, getCustUserSer, getCustomerSer, getFlightSer, getStaffUserSer, getSuperUserSer, getTicketSer
from .models import Adminstrator, Airline_Company, Country, Customer, Flight, Ticket
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# register
@api_view(['POST'])
def addUser(request):
    User.objects.create_user(username=request.data['username'],
                             email=request.data['email'],
                             password=request.data['password'])

    return JsonResponse({"user created": request.data['username']})

# add customer for user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCustomer(request, id=-1):
    user1 = request.user
    # user=User.objects.get(id=user1.id)
    if request.method == 'POST':  # method post add new row
        Customer.objects.create(first_name=request.data['first_name'], last_name=request.data['last_name'], address=request.data['address'],
                                phone_no=request.data['phone_no'], credit_card_no=request.data['credit_card_no'], user_id=User.objects.get(id=user1.id))
        return JsonResponse({'POST': "success"})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upCustomer(request, id=-1):
    user = request.user
    if request.method == 'PUT':  # method delete a row
        if user.is_active:
            temp = Customer.objects.get(user_id=user.id)
            temp.first_name = request.data['first_name']
            temp.last_name = request.data['last_name']
            temp.address = request.data['address']
            temp.phone_no = request.data['phone_no']
            temp.credit_card_no = request.data['credit_card_no']
            temp.save()

            return JsonResponse({'PUT': user.id})
        else:
            return JsonResponse({'not': 'authorized'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upUserAuth(request, id=-1):
    user = request.user
    if request.method == 'PUT':  # method delete a row
        if user.is_superuser:
            temp = User.objects.get(id=request.data['user_id'])
            temp.is_active = request.data['is_active']
            temp.is_staff = request.data['is_staff']
            temp.is_superuser = request.data['is_superuser']
            temp.save()

            return JsonResponse({'PUT': 'king'})
        else:
            return JsonResponse({'not': 'authorized'})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'token',
        'token/refresh',
    ]

    return Response(routes)


def index(r):
    return JsonResponse({'test': "test"})


def logout_view(request):
    logout(request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAuth(request):
    user = request.user
    if user.is_superuser:
        return JsonResponse({"Auth": "superuser"})
    elif user.is_staff:
        return JsonResponse({"Auth": "staff"})
    elif user.is_active:
        return JsonResponse({"Auth": "customer"})
    else:
        return JsonResponse({"go sign up": "not permitted"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = request.user
    if user.is_superuser:
        admin = Adminstrator.objects.get(user_id=user.id)
        return JsonResponse(getAdminSer(admin), safe=False)
    elif user.is_staff:
        airline = Airline_Company.objects.get(user_id=user.id)
        return JsonResponse(getAirSer(airline), safe=False)
    elif user.is_active:
        customer = Customer.objects.get(user_id=user.id)
        return JsonResponse(getCustomerSer(customer))
    else:
        return JsonResponse({"go sign up": "not permitted"})


@api_view(['GET'])
def getFlightsParameter(rquest, origin=None, destination=None, date=None):
    res = []
    for flight in Flight.objects.filter(origin_country_id=origin, destination_country_id=destination):
        if flight.departure_time.strftime('%Y-%m-%d') == date:
            res.append(getFlightSer(flight))
    if res:
        return JsonResponse(res, safe=False)
    else:
        return JsonResponse({"no flight": "like dis"})


@api_view(['GET'])
def getDepartureFlights(rquest, origin=None):
    res = []
    now = timezone.now()
    end_time = now + datetime.timedelta(hours=12)
    for flight in Flight.objects.filter(origin_country_id=origin):
        if flight.departure_time <= end_time and flight.departure_time > now:
            res.append(getFlightSer(flight))
    if res:
        return JsonResponse(res, safe=False)
    else:
        return JsonResponse({"no deparutre": "in 12 hours from this country"})


@api_view(['GET'])
def getDepartureFlightsAll(rquest, origin=None):
    res = []
    now = timezone.now()
    end_time = now + datetime.timedelta(hours=12)
    for flight in Flight.objects.all():
        if flight.departure_time <= end_time and flight.departure_time > now:
            res.append(getFlightSer(flight))
    if res:
        return JsonResponse(res, safe=False)
    else:
        return JsonResponse({"no_deparutre": "in 12 hours from this country"})


@api_view(['GET'])
def getLandingFlights(rquest, destination=None):
    res = []
    now = timezone.now()
    end_time = now + datetime.timedelta(hours=12)
    for flight in Flight.objects.filter(destination_country_id=destination):
        if flight.landing_time <= end_time and flight.landing_time > now:
            res.append(getFlightSer(flight))
    if res:
        return JsonResponse(res, safe=False)
    else:
        return JsonResponse({"no landing": "in 12 hours in this country"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCustomerTicket(request):
    user = request.user
    customer_user_id = Customer.objects.get(user_id=user.id)
    if user.is_active:
        res = []
        for ticket in Ticket.objects.filter(customer_id=customer_user_id):
            res.append(getTicketSer(ticket))
        if res:
            return JsonResponse(res, safe=False)
        else:
            return JsonResponse({"no tickets": "for you"})


@api_view(['GET'])
def getFlights(request, id=-1):
    if request.method == 'GET':  # method get all
        if int(id) > -1:  # get single product
            if int(id) > Flight.objects.count():
                return JsonResponse({"out of bounds array": "1111"})
            flight = Flight.objects.get(id=id)
            return JsonResponse(getFlightSer(flight), safe=False)
        else:  # return all
            res = []  # create an empty list
            for flight in Flight.objects.all():  # run on every row in the table...
                # append row by to row to res list
                res.append(getFlightSer(flight))
            # return array as json response
            return JsonResponse(res, safe=False)

@api_view(['PUT'])
def uptickets(request, id=-1):
    if request.method == 'PUT':  # method delete a row
        temp = Flight.objects.get(id=id)
        temp.remaining_tickets = request.data['remaining_tickets']
        temp.save()

        return JsonResponse({'PUT': id})

@api_view(['GET'])
def getAir_companies(request, id=-1, category=None):
    if request.method == 'GET':  # method get all
        if int(id) > -1:  # get single product
            if int(id) > Airline_Company.objects.count():
                return JsonResponse({"out of bounds array": "1111"})
            air_company = Airline_Company.objects.get(id=id)
            return JsonResponse(getAirSer(air_company), safe=False)
        else:  # return all
            res = []  # create an empty list
            # run on every row in the table...
            for air_company in Airline_Company.objects.all():
                # append row by to row to res list
                res.append(getAirSer(air_company))
            # return array as json response
            return JsonResponse(res, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTicket(request, id=-1):
    user = request.user
    if user.is_active:
        if request.method == 'POST':  # method post add new row
            Ticket.objects.create(flight_id=Flight.objects.get(
                id=request.data['flight_id']), customer_id=Customer.objects.get(id=user.customer.id),amount=request.data['amount'])
            return JsonResponse({'POST': user.username})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delTicket(request, id=-1):
    user = request.user
    if user.is_active:
        if request.method == 'DELETE':  # method delete a row
            temp = Ticket.objects.get(customer_id=user.customer.id, flight_id=Flight.objects.get(
                id=id))
            temp.delete()
            return JsonResponse({'DELETE': user.username})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddAir(request):
    if request.method == 'POST':  # method post add new row
        user = request.user
        if user.is_staff:
            Airline_Company.objects.create(name=request.data['name'], country_id=Country.objects.get(
                id=request.data['country_id']), user_id=user)
            return JsonResponse({'POST': "success"})
        else:
            return JsonResponse({'POST': "cant"})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateAir(request):
    user = request.user
    if user.is_staff:
        if request.method == 'PUT':  # method delete a row
            temp = Airline_Company.objects.get(user_id=user.id)
            temp.name = request.data['name']
            temp.country_id = Country.objects.get(
                id=request.data['country_id'])
            temp.user_id = User.objects.get(id=user.id)
            temp.save()

            return JsonResponse({'PUT': user.username})
    else:
        return JsonResponse({'PUT': "can not"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAirFlights(request):
    user = request.user
    if user.is_staff:
        if request.method == 'GET':  # method get all
            res = []  # create an empty list
            # run on every row in the table...
            for flight in Flight.objects.filter(airline_company_id=user.airline_company.id):
                # append row by to row to res list
                res.append(getFlightSer(flight))
            # return array as json response
            return JsonResponse(res, safe=False)
    else:
        return JsonResponse({"not": "authorized"})


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def flights(request, id=-1):
    user = request.user
    if user.is_staff:
        if request.method == 'GET':  # method get all
            if int(id) > -1:  # get single product
                if int(id) > Flight.objects.count():
                    return JsonResponse({"out of bounds array": "1111"})
                flight = Flight.objects.get(id=id)
                return JsonResponse(getFlightSer(flight), safe=False)
            else:  # return all
                res = []  # create an empty list
                for flight in Flight.objects.all():  # run on every row in the table...
                    # append row by to row to res list
                    res.append(getFlightSer(flight))
                # return array as json response
                return JsonResponse(res, safe=False)
        if request.method == 'POST':  # method post add new row
            Flight.objects.create(airline_company_id=Airline_Company.objects.get(id=user.airline_company.id), origin_country_id=Country.objects.get(id=request.data['origin_country_id']), destination_country_id=Country.objects.get(
                id=request.data['destination_country_id']), departure_time=request.data['departure_time'], landing_time=request.data['landing_time'], remaining_tickets=request.data['remaining_tickets'])
            return JsonResponse({'POST': "success"})
        if request.method == 'DELETE':  # method delete a row
            temp = Flight.objects.get(
                airline_company_id=user.airline_company.id, id=id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT':  # method delete a row
            temp = Flight.objects.get(
                airline_company_id=user.airline_company.id, id=id)

            temp.airline_company_id = Airline_Company.objects.get(
                id=user.airline_company.id)
            temp.origin_country_id = Country.objects.get(
                id=request.data['origin_country_id'])
            temp.destination_country_id = Country.objects.get(
                id=request.data['destination_country_id'])
            temp.departure_time = request.data['departure_time']
            temp.landing_time = request.data['landing_time']
            temp.remaining_tickets = request.data['remaining_tickets']
            temp.save()

            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({"not": "authorized"})


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def air_companies(request, id=-1, category=None):
    user = request.user
    if user.is_superuser:
        if request.method == 'GET':  # method get all
            if int(id) > -1 and category == 'flights':
                res = []  # create an empty list
                # run on every row in the table...
                for flight in Flight.objects.filter(airline_company_id=id):
                    # append row by to row to res list
                    res.append(getFlightSer(flight))
                # return array as json response
                return JsonResponse(res, safe=False)
            else:
                if int(id) > -1:  # get single product
                    if int(id) > Airline_Company.objects.count():
                        return JsonResponse({"out of bounds array": "1111"})
                    air_company = Airline_Company.objects.get(id=id)
                    return JsonResponse(getAirSer(air_company), safe=False)
                else:  # return all
                    res = []  # create an empty list
                    # run on every row in the table...
                    for air_company in Airline_Company.objects.all():
                        # append row by to row to res list
                        res.append(getAirSer(air_company))
                    # return array as json response
                    return JsonResponse(res, safe=False)
        if request.method == 'POST':  # method post add new row
            user = request.user
            if user.is_staff:
                Airline_Company.objects.create(name=request.data['name'], country_id=Country.objects.get(
                    id=request.data['country_id']), user_id=user)
                return JsonResponse({'POST': "success"})
            else:
                return JsonResponse({'POST': "cant"})
        if request.method == 'DELETE':  # method delete a row
            temp = Airline_Company.objects.get(id=id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT':  # method delete a row
            temp = Airline_Company.objects.get(id=id)
            temp.name = request.data['name']
            temp.country_id = Country.objects.get(
                id=request.data['country_id'])
            temp.user_id = User.objects.get(id=request.data['user_id'])
            temp.save()

            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({"not": "authorized"})


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def customers(request, id=-1):
    user = request.user
    if user.is_superuser:
        if request.method == 'GET':  # method get all
            if int(id) > -1:  # get single product
                if int(id) > Customer.objects.count():
                    return JsonResponse({"out of bounds array": "1111"})
                customer = Customer.objects.get(id=id)
                return JsonResponse(getCustomerSer(customer), safe=False)
            else:  # return all
                res = []  # create an empty list
                # run on every row in the table...
                for customer in Customer.objects.all():
                    # append row by to row to res list
                    res.append(getCustomerSer(customer))
                # return array as json response
                return JsonResponse(res, safe=False)
        if request.method == 'POST':  # method post add new row
            Customer.objects.create(first_name=request.data['first_name'], last_name=request.data['last_name'], address=request.data['address'],
                                    phone_no=request.data['phone_no'], credit_card_no=request.data['credit_card_no'], user_id=User.objects.get(id=request.data['user_id']))
            return JsonResponse({'POST': "success"})
        if request.method == 'DELETE':  # method delete a row
            temp = Customer.objects.get(id=id)
            temp.delete()
            return JsonResponse({'DELETE': id})
    else:
        return JsonResponse({'not': 'authorized'})
    if request.method == 'PUT':  # method delete a row
        if user.is_active:
            temp = Customer.objects.get(user_id=user.id)
            temp.first_name = request.data['first_name']
            temp.last_name = request.data['last_name']
            temp.address = request.data['address']
            temp.phone_no = request.data['phone_no']
            temp.credit_card_no = request.data['credit_card_no']
            temp.save()

            return JsonResponse({'PUT': user.id})
        else:
            return JsonResponse({'not put': 'authorized'})


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def countries(request, id=-1):
    if request.method == 'GET':  # method get all
        if int(id) > -1:  # get single product
            if int(id) > Country.objects.count():
                return JsonResponse({"out of bounds array": "1111"})
            country = Country.objects.get(id=id)
            return JsonResponse(getCountrySer(country), safe=False)
        else:  # return all
            res = []  # create an empty list
            # run on every row in the table...
            for country in Country.objects.all():
                # append row by to row to res list
                res.append(getCountrySer(country))
            # return array as json response
            return JsonResponse(res, safe=False)
    if request.method == 'POST':  # method post add new row
        # desc =request.data['desc']
        Country.objects.create(name=request.data['name'])
        return JsonResponse({'POST': "success"})
    if request.method == 'DELETE':  # method delete a row
        temp = Country.objects.get(id=id)
        temp.delete()
        return JsonResponse({'DELETE': id})
    if request.method == 'PUT':  # method delete a row
        temp = Country.objects.get(id=id)
        temp.name = request.data['name']
        temp.save()

        return JsonResponse({'PUT': id})


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def users(request, id=-1, username=None):
    if request.method == 'GET':  # method get all
        user = User.objects.get(username=username)
        if username != None:
            if user.username == username:
                if user.is_superuser:
                    return JsonResponse(getSuperUserSer(user), safe=False)
                elif user.is_staff:
                    return JsonResponse(getStaffUserSer(user), safe=False)
                else:
                    return JsonResponse(getCustUserSer(user), safe=False)
        if int(id) > -1:  # get single product
            if int(id) > User.objects.count():
                return JsonResponse({"out of bounds array": "1111"})
            user = User.objects.get(id=id)
            if user.is_superuser:
                return JsonResponse(getSuperUserSer(user), safe=False)
            elif user.is_staff:
                return JsonResponse(getStaffUserSer(user), safe=False)
            else:
                return JsonResponse(getCustUserSer(user), safe=False)
        else:  # return all
            res = []  # create an empty list
            # run on every row in the table...
            for user in User.objects.all():
                if user.is_superuser:
                    res.append(getSuperUserSer(user))
                elif user.is_staff:
                    # append row by to row to res list
                    res.append(getStaffUserSer(user))
                else:
                    res.append(getCustUserSer(user))
            # return array as json response
            return JsonResponse(res, safe=False)
    if request.method == 'DELETE':  # method delete a row
        temp = User.objects.get(id=id)
        temp.delete()
        return JsonResponse({'DELETE': id})
    if request.method == 'PUT':  # method delete a row
        temp = User.objects.get(id=id)
        temp.username = request.data['username']
        temp.password = request.data['password']
        temp.email = request.data['email']
        temp.save()

        return JsonResponse({'PUT': id})


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def tickets(request, id=-1):
    if request.method == 'GET':  # method get all
        if int(id) > -1:  # get single product
            if int(id) > Ticket.objects.count():
                return JsonResponse({"out of bounds array": "1111"})
            ticket = Ticket.objects.get(id=id)
            return JsonResponse(getTicketSer(ticket), safe=False)
        else:  # return all
            res = []  # create an empty list
            # run on every row in the table...
            for ticket in Ticket.objects.all():
                # append row by to row to res list
                res.append(getTicketSer(ticket))
            # return array as json response
            return JsonResponse(res, safe=False)
    if request.method == 'POST':  # method post add new row
        Ticket.objects.create(flight_id=Flight.objects.get(
            id=request.data['flight_id']), customer_id=Customer.objects.get(id=request.data['customer_id']))
        return JsonResponse({'POST': "success"})
    if request.method == 'DELETE':  # method delete a row
        temp = Ticket.objects.get(id=id)
        temp.delete()
        return JsonResponse({'DELETE': id})
    if request.method == 'PUT':  # method delete a row
        temp = Ticket.objects.get(id=id)
        temp.flight_id = Flight.objects.get(id=request.data['flight_id'])
        temp.customer_id = Customer.objects.get(id=request.data['customer_id'])
        temp.save()

        return JsonResponse({'PUT': id})


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def adminstrators(request, id=-1):
    user = request.user
    if user.is_superuser:
        if request.method == 'GET':  # method get all
            if int(id) > -1:  # get single product
                if int(id) > Adminstrator.objects.count():
                    return JsonResponse({"out of bounds array": "1111"})
                admin = Adminstrator.objects.get(id=user.id)
                return JsonResponse(getAdminSer(admin), safe=False)
            else:  # return all
                res = []  # create an empty list
                # run on every row in the table...
                for admin in Adminstrator.objects.all():
                    # append row by to row to res list
                    res.append(getAdminSer(admin))
                # return array as json response
                return JsonResponse(res, safe=False)
        if request.method == 'POST':  # method post add new row
            Adminstrator.objects.create(
                first_name=request.data['first_name'], last_name=request.data['last_name'], user_id=user)
            return JsonResponse({'POST': "success"})
        if request.method == 'DELETE':  # method delete a row
            temp = Adminstrator.objects.get(id=id)
            temp.delete()
            return JsonResponse({'DELETE': id})
        if request.method == 'PUT':  # method delete a row
            temp = Adminstrator.objects.get(id=id)
            temp.first_name = request.data['first_name']
            temp.last_name = request.data['last_name']
            temp.user_id = User.objects.get(id=request.data['user_id'])
            temp.save()

            return JsonResponse({'PUT': id})
    else:
        return JsonResponse({'not': "authorized"})


# api
import random

@api_view(['GET','POST'])
def flightapi(request, id=-1):
    today = datetime.date.today()
    now = datetime.datetime.now() + datetime.timedelta(hours=random.randint(1,3))
    land = datetime.datetime.now() + datetime.timedelta(hours=random.randint(3,6))
    current_time = now.strftime("%H:%M") 
    landing_time = land.strftime("%H:%M") 
    countryrand = Country.objects.get(id=random.choice([i for i in range(1,16)]))
        # return JsonResponse(datatest,safe=False)
    if request.method == 'POST':  # method post add new row
        flight = Flight.objects.create(airline_company_id=Airline_Company.objects.get(id=random.choice([i for i in range(1,7) if i not in [6]])),
        origin_country_id=countryrand,
        destination_country_id=Country.objects.get(id=random.choice([i for i in range(1,16)if i != countryrand])),
        departure_time=f'{today} {current_time}',
        landing_time=f'{today} {landing_time}',
        remaining_tickets=random.randint(1, 100))
        return JsonResponse(getFlightSer(flight))
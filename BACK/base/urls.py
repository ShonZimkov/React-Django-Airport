from django.contrib import admin
from django.urls import path
from . import views
from .views import MyTokenObtainPairView
 
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.index),
    path('flights', views.flights), #get - all (V,getflights), add - airline (V) , update - airline (V,/id), delete - airline (V,/id)
    path('getflights', views.getFlights),
    path('flights/<id>', views.flights), #all (V,getflights/id)
    path('getflights/<id>', views.getFlights),
    path('flightpar/<origin>/<destination>/<date>', views.getFlightsParameter), #all (V)
    path('departure', views.getDepartureFlightsAll),
    path('departure/<origin>', views.getDepartureFlights),
    path('landing/<destination>', views.getLandingFlights),
    path('air_companies', views.air_companies), #get - all (V,getair_companies) , update - airline (V,updateair) , add - airline (V,addairline) , delete - admin (V/id)
    path('addairline', views.AddAir),
    path('getair_companies', views.getAir_companies),
    path('air_companies/<id>', views.air_companies), #all (V,getair_companies/id)
    path('updateair', views.updateAir),
    path('getair_companies/<id>', views.getAir_companies),
    path('getairflights', views.getAirFlights), # user logged airline (V)
    path('getuserinfo', views.getUserInfo),
    path('customers', views.customers),  # add - anonymous (V,addcustomer) , update - customer (V) , get - admin (V) , delete - admin (V/id)
    path('upcustomer', views.upCustomer),
    path('addcustomer', views.addCustomer), 
    path('customers/<id>', views.customers),
    path('countries', views.countries), #get - all (V)
    path('countries/<id>', views.countries), #all (V)
    path('users', views.users),
    path('users/<id>', views.users),
    path('username/<username>', views.users),
    path('tickets', views.tickets), # add - customer (V,addticket) , delete - customer (V,delticket)
    path('addticket', views.addTicket),
    path('delticket/<id>', views.delTicket),
    path('tickets/<id>', views.tickets),
    path('cust_ticket', views.getCustomerTicket), # user logged customer (V)
    path('adminstrators', views.adminstrators), # add - admin (V) , delete - admin (V)  
    path('adminstrators/<id>', views.adminstrators),
    
    #authentication
    path('adduser', views.addUser), #all (V)
    path('upuserauth', views.upUserAuth),
    path('getauth', views.getAuth),
    path('logout', views.logout_view),
    
    path('uptickets/<id>', views.uptickets),

    #api
    path('api', views.flightapi),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #login - anonymous (V)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

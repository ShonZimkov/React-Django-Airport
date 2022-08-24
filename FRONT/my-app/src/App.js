import './App.css';
import MyLogin from './Anonymus/Mylogin';
import AddCustomer from './Anonymus/AddCustomer';
import React, { useState  } from 'react'
import AdminFacade from './Admin/AdminFacade';
import AirlineFacade from './Airline/AirlineFacade';
import CustomerFacade from './Customer/CustomerFacade';
import BaseFacade from './Base/BaseFacade';
import AnonymusFacade from './Anonymus/AnonymusFacade';
import {  Routes, Route } from 'react-router-dom';
import UpCustomer from './Customer/UpCustomer';
import Mytickets from './Customer/Mytickets';
import AddCustomerAdmin from './Admin/AddCustomerAdmin';
import DelAdmin from './Admin/DelAdmin';
import DelCustomer from './Admin/DelCustomer';
import MyCustomers from './Admin/MyCustomers';
import UpUserAuth from './Admin/UpUserAuth';
import AddAdmin from './Admin/AddAdmin';
import AddAirline from './Admin/AddAirline';
import DelAirline from './Admin/DelAirline';
import UpFlight from './Airline/UpFlight';
import UpAirline from './Airline/UpAirline';
import AirlineFlights from './Airline/AirlineFlights';
import AddFlight from './Airline/AddFlight';
import MyRegister from './Base/MyRegister';
import MyLogout from './Navbar/MyLogout';
import FlightByPar from './Base/FlightByPar';
import MyDep from './Base/MyDep';
import MyflightsCard1 from './Base/MyflightsCard1';
import MyCountries from './Base/MyCountries';
import MyAirlines from './Base/MyAirlines';
import NavbarBar from './Navbar/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import BuyPage from './components/BuyPage';

function App() {
  return (
    <div >
      <div>
      <NavbarBar/>
      </div>
      <div>
      <Routes>
          {/* search */}
          <Route path="/" element={<Header />} />
          <Route path="/buy" element={<BuyPage />} />
          {/* facades */}
          <Route path="/admin" element={<AdminFacade />} />
          <Route path="/airline" element={<AirlineFacade />} />
          <Route path="/customer" element={<CustomerFacade />} />
          <Route path="/base" element={<BaseFacade />} />
          <Route path="/" element={<AnonymusFacade />} />
          {/* admin */}
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/addairline" element={<AddAirline />} />
          <Route path="/addcustomeradmin" element={<AddCustomerAdmin />} />
          <Route path="/deladmin" element={<DelAdmin />} />
          <Route path="/delairline" element={<DelAirline />} />
          <Route path="/delcustomer" element={<DelCustomer />} />
          <Route path="/customers" element={<MyCustomers />} />
          <Route path="/upauth" element={<UpUserAuth />} />
          {/* airline */}
          <Route path="/addflight" element={<AddFlight />} />
          <Route path="/airlineflights" element={<AirlineFlights />} />
          <Route path="/upairline" element={<UpAirline />} />
          <Route path="/upflight" element={<UpFlight />} />
          {/* customer */}
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/upcustomer" element={<UpCustomer />} />
          <Route path="/tickets" element={<Mytickets />} />
          {/* anonymus */}
          <Route path="/sign-up" element={<MyRegister />} />
          <Route path="/login" element={<MyLogin />} />
          <Route path="/logout" element={<MyLogout />} />
          {/* base */}
          <Route path="/baseflights" element={<MyflightsCard1 />} />
          <Route path="/flightpar" element={<FlightByPar />} />
          <Route path="/baseairlines" element={<MyAirlines />} />
          <Route path="/basecountries" element={<MyCountries />} />
          <Route path="/basedepartures" element={<MyDep />} />

        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

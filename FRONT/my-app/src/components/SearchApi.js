// A mock function to mimic making an async request for data
import axios from "axios";
const url = "http://127.0.0.1:8000/flightpar/";
 

  export const AllFlights = () => {
    // console.log();
    return new Promise((resolve) =>
      axios.get("http://127.0.0.1:8000/getflights").then((res) => resolve({ data: res.data }))

    );
  };

  export const AllCountries = () => {
    return new Promise((resolve) =>
      axios.get("http://127.0.0.1:8000/countries").then((res) => resolve({ data: res.data }))

    );
  };

  

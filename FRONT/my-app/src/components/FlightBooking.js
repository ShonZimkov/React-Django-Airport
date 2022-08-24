import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AllFlightsAsync, selectAllCountries, AllCountriesAsync ,searchdata} from "./SearchSlice";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { useForm } from "react-hook-form";
import '../App.css';
import { Button } from "react-bootstrap";
import { ticketsdata } from "./BuySlice";

const FlightApp = () => {
  const allcountries = useSelector(selectAllCountries)
  const dispatch = useDispatch();
  const [data, setdata] = useState([])
  const ticketsbought = Number(data.adult) + Number(data.children)

  // active on load
  useEffect(() => {
    // call api or anything
    dispatch(AllFlightsAsync())
    dispatch(AllCountriesAsync())
    console.log("loaded");
 },[]);

  // handle event
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
      departure:'Israel'
    }
  });

  // on submit get values
 useEffect(() => {
  const subscription = watch((data) => 
  setdata(data)

  )
  return () => subscription.unsubscribe();
}, [watch]);

  useEffect(() => {
    dispatch(ticketsdata(ticketsbought))
  }, [searchdata()])
  

  // handle submit
  const onSubmit = (data) => alert(JSON.stringify(data));
  return (
    <React.Fragment>
      
      <section >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formBorder bg-white w-auto h-auto pb-10  mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto mb-5">
            {/* header section */}
            <div className="fluid h-24 flex justify-center items-center shadow ">
              <center><p className="formtxt ">
                Flight Booking  
              </p>
              </center>
            </div>

            {/* body section */}
            <div>
              <div className="grid justify-center space-y-5 bg-indigo-50 pb-10">
                <hr></hr>
                {/* departure section */}
                <div className="rowC">
                  <div >
                    <div className="relative">
                      <p className="formtxt ">Flying From</p>
                      <select
                        className={`w-full h-16 text-2xl pl-20 rounded-lg ${
                          errors.departure &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        {...register("departure", {
                          required: {
                            value: true,
                            message: "Departure is required",
                          },
                        })}
                      >
                        {
                          allcountries.map((country,i) => <option key={i} value={country.name}>{country.name}</option>)
                        }
                      </select>
                      
                      <FaPlaneDeparture className="text-4xl absolute left-5 top-10 " />
                    </div>
                    <div>
                      {errors.departure && (
                        <span className="text-sm text-red-500">
                          {errors.departure.message}
                        </span>
                      )}
                    </div>
                  </div>


                  {/* arrival section */}

                  <div>
                    <div className="relative">
                      <p className="formtxt">Flying To</p>
                      <select 
                      className={`w-full h-16 text-2xl pl-20 rounded-lg ${
                        errors.arrival &&
                        " focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      {...register("arrival", {
                        required: {
                          value: true,
                          message: "Arrival is required",
                        },
                      })}
                      >
                        {
                          allcountries.map((country,i) => <option key={i} value={country.name}>{country.name}</option>)
                        }


                      </select>
                      <FaPlaneArrival className="text-4xl absolute left-5 top-10 " />
                    </div>
                    <div>
                      {errors.arrival && (
                        <span className="text-sm text-red-500">
                          {errors.arrival.message}
                        </span>
                      )}
                    </div>
                  </div>
                        
                </div>
                {/* date section */}

                <div className="rowC">
                  {/* departure section */}
                  <div>
                    <div>
                      <div className="relative">
                        <p className="formtxt">
                          Departure Date
                        </p>
                         <input
                        //  name="departure"
                          type="date"
                          className={`w-full h-16 text-2xl rounded-lg ${errors.departureDate &&
                            " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                          {...register("departureDate", {
                            required: {
                              value: true,
                              message: "Departure date is required",
                            },
                          })}
                        />
                      </div>
                      <div>
                        {errors.departureDate && (
                          <span className="text-sm text-red-500">
                            {errors.departureDate.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* return section */}
                  <div>
                    <div>
                      <div className="relative">
                        <p className="formtxt">
                          Return Date
                        </p>
                        <input
                          type="date"
                          className={`w-full h-16 text-2xl rounded-lg ${errors.returnDate &&
                            " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                          {...register("returnDate", {
                            required: {
                              value: true,
                              message: "Return date is required",
                            },
                          })}
                        />
                      </div>
                      <div>
                        {errors.returnDate && (
                          <span className="text-sm text-red-500">
                            {errors.returnDate.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                {/* passenger section */}
                <div className="rowC">
                  {/* adult section */}
                  <div className="w-full">
                    <div>
                      <div className="relative">
                        <p className="formtxt">
                          {" "}
                          Adults (18+)
                        </p>
                        <center>
                          <select
                            className="w-full h-16 rounded-lg text-2xl pl-20"
                            {...register("adult", {
                              required: {
                                value: true,
                                message: "Trip type is required",
                              },
                            })}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <GiPerson className="text-4xl absolute left-5 top-10 " />
                        </center>
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>

                  {/* children section */}
                  <div className="w-full">
                    <div>
                      <div className="relative">
                        <p className="formtxt">
                          {" "}
                          Children (0-17)
                        </p>
                        <center>
                          <select
                            className="w-full h-16 rounded-lg text-2xl pl-20"
                            {...register("children", {
                              required: {
                                value: true,
                                message: "Trip type is required",
                              },
                            })}
                          >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <FaChild className="text-4xl absolute left-5 top-10 " />
                        </center>
                      </div>
                      {/* <div>Error</div> */}
                    </div>
                  </div>
                </div>
                <hr></hr>
                {/* class and price section
                <div className="rowC">
                  class section
                  <div className="w-full">
                    <div>
                      <div>
                        <p className="formtxt"> Class</p>
                        <select
                         className="w-full h-16 rounded-lg text-2xl pl-20"
                         {...register("class", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                         >
                          <option>Economy</option>
                          <option>Business</option>
                        </select>
                      </div>
                      <div>Error</div>
                    </div>
                  </div>

                  price section
                  <div className="w-full">
                    <div>
                      <div>
                        <p className="formtxt"> Price</p>
                        <select
                         className=" w-full h-16 rounded-lg text-2xl pl-20"
                         {...register("price", {
                            required: {
                              value: true,
                              message: "Trip type is required",
                            },
                          })}
                         >
                          <option>All Prices</option>
                          <option>$ 1000</option>
                          <option>$ 2000</option>
                          <option>$ 3000</option>
                          <option>$ 4000</option>
                          <option>$ 5000</option>
                        </select>
                      </div>
                      <div>Error</div>
                    </div>
                  </div>
                </div> */}   

                {/* btn section */}  
                <center>
                  <div className='buttonRight '>
                  <button type="submit" value="Find flight" className="btn btn-outline-danger"  onClick={() => dispatch(searchdata(data))} >Find Flight</button>
                  </div>
                </center>

              </div>
            </div>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default FlightApp;

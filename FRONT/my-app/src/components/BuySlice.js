import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCust } from "./BuyApi";
// ,Searchflightback ,AllFlights
 
const initialState = {
    DataBuy: [],
    searched : false,
    TicketsBought:'',
    Cust:[],

  status: "idle",
};

export const getCustAsync = createAsyncThunk("buy/getCust", async () => {
    const response = await getCust();
    // console.log(search)
    return response.data;
  });  

export const buySlice = createSlice({
  name: "buy",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    buydata: (state,action) => {
      // state.DataSearch = localStorage.getItem("searchdata")
      state.DataBuy = action.payload
      console.log(action.payload)
      // console.log(action.payload)
      
  },ticketsdata: (state,action) => {
    // state.DataSearch = localStorage.getItem("searchdata")
    state.TicketsBought = action.payload
    console.log(action.payload)
    // console.log(action.payload)
    
},
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCustAsync.fulfilled, (state, action) => {
        // state.status = "Done";
        state.Cust = action.payload; 
        // console.log(action.payload)       
        // state.AllFlights = state.AllFlights.filter(x=>x.origin_country === action.payload.origin_country)
        // console.log(state.AllFlights)
      })
  },
});
 
export const {buydata ,ticketsdata} = buySlice.actions;
export const selectbuy = (state) => state.buy.DataBuy;
export const selectCust = (state) => state.buy.Cust;
export const selectTicket = (state) => state.buy.TicketsBought;

export default buySlice.reducer;
 

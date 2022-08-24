import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllFlights,AllCountries} from "./SearchApi";
// ,Searchflightback ,AllFlights
 
const initialState = {
    DataSearch: [],
    searched : false,
    AllFlights:[],
    AllCountries:[],

  status: "idle",
};

  export const AllFlightsAsync = createAsyncThunk("search/AllFlights", async () => {
    const response = await AllFlights();
    // console.log(response.data)
    // console.log(search)
    return response.data;
  });

  export const AllCountriesAsync = createAsyncThunk("search/AllCountries", async () => {
    const response = await AllCountries();
    // console.log(response.data)
    // console.log(search)
    return response.data;
  });
 

export const searchSlice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    searchdata: (state,action) => {
      // state.DataSearch = localStorage.getItem("searchdata")
      state.DataSearch = action.payload
      state.searched = true
      // console.log(action.payload)
      
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllFlightsAsync.fulfilled, (state, action) => {
        state.status = "Done";
        state.AllFlights = action.payload;        
        // state.AllFlights = state.AllFlights.filter(x=>x.origin_country === action.payload.origin_country)
        // console.log(state.AllFlights)
      })
      .addCase(AllCountriesAsync.fulfilled, (state, action) => {
        state.status = "Done";
        state.AllCountries = action.payload; 
        // console.log(state.AllCountries)
      })
      
  },
});
 
export const {searchdata } = searchSlice.actions;
export const selectAllFligths = (state) => state.search.AllFlights;
export const selectAllCountries = (state) => state.search.AllCountries;
export const selectData = (state) => state.search.DataSearch;
export const selectsearched = (state) => state.search.searched;

export default searchSlice.reducer;
 

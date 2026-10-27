import { createSlice } from "@reduxjs/toolkit";

const loadRecent = () => {
  try {
    return JSON.parse(localStorage.getItem("recentSearches")) ?? [];
  } catch {
    return [];
  }
};

const weatherSlice = createSlice({
    name : "weather",
    initialState:{
        query:'',
        loading:false,
        error:null,
        results:null,
        max_temp:[],
        min_temp:[],
        Isday: 1,
        response:null,
        weatherCode:null,
        Fore_time : [],
        recent: loadRecent(),
    },
    reducers : {
        setQuery(state,action){
            state.query = action.payload;
        },
        setResults(state,action){
            state.results= action.payload;
            state.loading = false;
        },
        setLoading(state){
            state.loading = true;
            state.error = null;
        },
        setError(state,action){
            state.error = action.payload;
            state.loading = false;
        },
        setmax_temp(state,action)
        {
            state.max_temp = action.payload;
            state.loading = false;
        },
        setmin_temp(state,action){
            state.min_temp = action.payload;
            state.loading = false;
        },
        setIsday(state,action){
            state.Isday=action.payload;
            state.loading = false;
        },
        setResponse(state,action){
            state.response = action.payload;
            state.loading = false;
        },
        setWeatherCode(state,action){
            state.weatherCode = action.payload;
            state.loading = false;
        },
        setFore_time(state,action){
            state.Fore_time = action.payload;
            state.loading = false;
        },
        setRecent(state, action) 
        {
            const city = action.payload;
            
            if (!city) return;
            // remove duplicates (case-insensitive), put newest first, keep max 5
            state.recent = [
                city, ...state.recent.filter((c) => c.toLowerCase() !== city.toLowerCase()),
            ].slice(0, 5);

            localStorage.setItem("recentSearches", JSON.stringify(state.recent));
        },

        setclearRecent (state) {
        state.recent = [];
        localStorage.removeItem("recentSearches");
        },
    }
})

export const {setRecent, setclearRecent, setQuery,setError,setLoading,setResults,setmax_temp,setmin_temp,setIsday,setResponse,setWeatherCode,setFore_time} = weatherSlice.actions;

export default weatherSlice.reducer;
import axios from "axios";
/////////////////////url///////////////
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN
// "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmU5MzM1Yjg5Y2E3NWE3MGJjY2UxYzcyYmZkMDQ4ZCIsInN1YiI6IjYzYmVkN2FiODU4Njc4MDBmMDhjZjI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQHes_rn51wewxY_7nZLxGssnd67J8ieiLOIo2Bg_FI"

const headers = {
    ///////////////////////space mandatory////////////////
    Authorization: "bearer " + TMDB_TOKEN,
};

//url endpoint  params parameter 
export const fetchDataFromApi = async (url, params) => {
    try {
        ////////////////data 
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        /////return data
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};


//after compler redux toolkit then chak using redux dev tool
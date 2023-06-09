import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
////////////////////////
import { useSelector, useDispatch } from "react-redux";
/////////////
import { getApiConfiguration, getGenres } from "./store/homeSlice";
//
import Header from "./components/header/Header";
//
import Footer from "./components/footer/Footer";
//
import Home from "./pages/home/Home";
//
import Details from "./pages/details/Details";
//
import SearchResult from "./pages/searchResult/SearchResult";
//
import Explore from "./pages/explore/Explore";
//
import PageNotFound from "./pages/404/PageNotFound";

function App() {
    //using this hook call
    const dispatch = useDispatch();
    ////state is url,geners
    const { url } = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        //apitesting()
        fetchApiConfig();
        //moves and tv
        genresCall();
    }, []);
//////////////////
    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);
//network ta confing inside  images backdrop  res.images.secure_base_url all are inside config
//three types of images
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };


    ////////////////////moves tv endpoint
    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        console.log(data);
        data.map(({ genres }) => {
            //id key value response
            return genres.map((item) => (allGenres[item.id] = item));
        });
        //go to store and save
        console.log(allGenres)

        dispatch(getGenres(allGenres));
    };




//     ///to get movies data
// const apiTesting=()=>{
//     fetchDataFromApi('/movies/populer').then(res=>console.log(resuult))
//using this all data store in store
// dispach(getApiConfigure(res))  res any value
// }


    return (
        // <div>
        //     App
        //     {url?.total_pages} totaql pages count show
        //     <div/>
        ////////////////////////
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                {/* search */}
                {/* /////////////////search result */}
                <Route path="/search/:query" element={<SearchResult />} />
               {/* if medi type tv or movews */}
               {/* ///////////explore */}
                <Route path="/explore/:mediaType" element={<Explore />} />
              {/* if not anyone rote finfd thn this */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

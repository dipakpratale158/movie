import React, { useState, useEffect } from "react";
////////search
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
//import fech hook
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    //////search
    const navigate = useNavigate();
    //call api
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");
///backdrop
    useEffect(() => {
        const bg =
            url.backdrop +
            //use network tab and find all this result backdrop [path]
          //if any time use api then ues many time ? this means not go after 
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);//because data inside response 

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            //search
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        {/* //// */}
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                          
                            onChange={(e) => setQuery(e.target.value)}
                          ///search
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;

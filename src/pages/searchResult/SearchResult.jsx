import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//////////infinite fech movies
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
//create both
import MovieCard from "../../components/movieCard/MovieCard";
/////////spiner 
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
    ///data
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    //goe app.js this qury heare
    const { query } = useParams();
/////first create 
    const fetchInitialData = () => {
        //when use effect run 1
        //loader true
        setLoading(true);
///        //when use effect run 2

        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };
//if this call boyh merge else first data loss pages
    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                // data
                if (data?.results) {
                    setData({
                        //purana data add merge
                        ...data,
                        // naya data ka result purana data =>...data?.results  ,naya data =>...res.results
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    //initialy data null pass datr as it is jo bhi he wo
                    setData(res);
                }

                //fisr api call 1 page data add 1 next pagee  data
                setPageNum((prev) => prev + 1);
            }
        );
    };
////////2
    useEffect(() => {
        /////
        setPageNum(1);
        fetchInitialData();
    }, [query]);
    ///if anytimkre qury change api call fetchapi

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {/* //data */}
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${

                                    //qury searech ki uska ek hi result he
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            {/* //////infinite scrolling */}
                            <InfiniteScroll
                                className="content"
                                //data lenth 20 initialy undefinfd []
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                ///total_pages find netwotrk tab
                                hasMore={pageNum <= data?.total_pages}
                                //loader
                                loader={<Spinner />}
                            >
                                {/* //whenever find data please add optional chining ? 
                                */}                               {data?.results.map((item, index) => {
                                    if (item.media_type === "person") 
                                    //not show frontend
                                    return;
                                    return (
                                        //moves card
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        //if data <=0
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;

import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";
///add endpoint populer5/
////////title destructure simiiler
const Carousel = ({ data, loading, endpoint, title }) => {
   ///////ref scrowll arrow
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        ////////
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);
//hjavascript scroll to method
        container.scrollTo({
            left: scrollAmount,
            //smoothly slide ho
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            // skeleton use animted
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            {/* //scrolling arrow width 100% move logic */}
            <ContentWrapper>
                {/* ////////////ttitle similer */}
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {/* //data load completely the this code */}
                {!loading ? (
                    //////////////////////////ref select this div element then use useref
                    /////////scroll arrow
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            //if incase not fech image
                            //poster_path chech network tab
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                   
                                    className="carouselItem"
                                //   detali page open
                                    onClick={() =>
                                        navigate(
                                            //endpoint add
                                            `/${item.media_type || endpoint}/${
                                                item.id
                                            }`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        {/* vote_average ckeck network ///////// */}
                                        <CircleRating
                                            rating={item.vote_average.
                                                //only one value after point
                                                toFixed(
                                                1
                                            )}
                                        />
                                        {/* /////////Genres//// */}
                                        <Genres
                                        //genre_ids inside network tab
                                        //0-2 only two item thts reason two word presesnt
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                                    </div>
                                    <div className="textBlock">
                                       {/* //if not find title then use name becuse tv seriam name is  */}
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                        {/* dayjs  is library */}
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (

                    //data load ho raha he to ye code
                    <div className="loadingSkeleton">
                        {/* //animated loading */}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;

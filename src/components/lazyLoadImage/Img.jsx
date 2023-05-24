import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
////////////////////////////////////
const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}  //'image nam=>e'""
            alt=""
            effect="blur"  //or oopacity effect also
            src={src}
        />
    );
};

export default Img;

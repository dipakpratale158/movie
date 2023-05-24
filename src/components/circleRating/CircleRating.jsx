import React from "react";
//import
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";
/////////////////////
const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                //maxvalue cooment out so out of 100 compare if 10 so compare out of 10
                maxValue={10}
                text={rating}
                /////import
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;

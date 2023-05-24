import React from "react";
import { useSelector } from "react-redux";
//i want get data from store
import "./style.scss";
///data   ides  all id are in data
const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    return (
        <div className="genres">
            {/* // */}
            {data?.map((g) => {
                //if not awailabe  sotor file id so return otherwise appp crashesh
                if (!genres[g]?.name) return;
                // 
                return (
                    <div key={g} className="genre">
                        {/* //pink color name */}
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;

import React from "react";

import "./style.scss";
////////////////////////////////spinner add search result
const Spinner = ({ initial }) => {
    return (
        <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
            {/* //roundly spin */}
            <svg className="spinner" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    );
};

export default Spinner;

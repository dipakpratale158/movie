import React, { useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    //div position left
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);//initialy 0 when change tab then change value

    const activeTab = (tab, index) => {
        //if multiply then automatic moveing other tab
        setLeft(index * 100);
        setTimeout(() => {
            //when i am selecting index
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        //index based active class
                        className={`tabItem ${
                            //if equal
                            selectedTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                {/* ///////////// */}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    );
};

export default SwitchTabs;

import React, { useState, useRef } from "react";
import Chevron from "./Chevron";

import "./ExpandableList.css";

const ExpandableList = ({ title, children, isOpen ,onClick }) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("expandableList__icon");
  
  const content = useRef(null);

 
  const toggleExpandableList = () => {
    onClick(title);
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
    //setHeightState(!isOpen ? "0px" : `${content.current.scrollHeight}px`)
    setRotateState(
      setActive === "active"
        ? "expandableList__icon"
        : "expandableList__icon rotate"
    );
    
  }
  console.log(isOpen)
  return (
    <div className="expandableList__section">
      <button
        className={`expandableList ${setActive}`}
        onClick={toggleExpandableList}
      >
        <p className="expandableList__title">{title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="expandableList__content"
      >
        <div className="expandableList__text">{children}</div>
      </div>
    </div>
  );
}

export default ExpandableList;

import React, { useState, useRef } from "react";
import Chevron from "./Chevron";

import "./ExpandableList.css";

function ExpandableList(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("expandableList__icon");

  const content = useRef(null);

  function toggleExpandableList() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active"
        ? "expandableList__icon"
        : "expandableList__icon rotate"
    );
  }

  return (
    <div className="expandableList__section">
      <button
        className={`expandableList ${setActive}`}
        onClick={toggleExpandableList}
      >
        <p className="expandableList__title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="expandableList__content"
      >
        <div className="expandableList__text">{props.children}</div>
      </div>
    </div>
  );
}

export default ExpandableList;

import React from "react";
import Header from "../../Component/Header";
import FirstContainer from "../../Component/FirstContainer";
import SecondContainer from "../../Component/SecondContainer";
import Foot from "../../Component/Foot";
import "./homepage.css";

export default function page() {
  return (
    <div>
      <FirstContainer />
      <SecondContainer />
    </div>
  );
}

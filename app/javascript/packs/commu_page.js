import React from "react";
import ReactDOM from "react-dom";
import CommunityPage from "../components/CommunityPage";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-community");
  ReactDOM.render(<CommunityPage />, container);
});

import React from "react";

import Navbar from "../Layout/Navbar";

const GlobalLayout = ({ children }) => {
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  return (
    <>
      <Navbar loginDetail={loginDetail} />
      <div className="container">
        <div>{children}</div>
      </div>
    </>
  );
};

export default GlobalLayout;

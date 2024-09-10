import React from "react";
import bg from "../assets/bg-desktop-light-BIdKokTn.jpg";
import moon from "../assets/night-mode.png";

const Header = () => {
  return (
    <div className=" w-full">
      <img src={bg} alt="Background" className="w-full h-[410px]  object-cover" />
      
    </div>
  );
};

export default Header;

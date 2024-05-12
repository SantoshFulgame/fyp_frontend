import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";
import logo from "../../assest/Home_service_logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" >
     
     
          <div id="lo" className="h-16">
            <img src={logo} className="h-full" />
          </div>
        
      <ItemsContainer />
      
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span >© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
import { AiOutlineGithub } from "react-icons/ai"; 
import { RiTelegramLine } from "react-icons/ri"; 
import { RiWhatsappLine } from "react-icons/ri"; 
import { CgFacebook } from "react-icons/cg"; 
import React from "react";
import { Link } from "react-router-dom";
import { SiInstagram, SiTwitter } from "react-icons/si";


const Footer = () => {
  const footerTextStyle = {
    fontSize: "25px", // Customize the font size here
  };

  return (
    <div className="footer">
      <h1 className="text-center" style={footerTextStyle}>
        All Right Reserved &copy; Blaze-Store
      </h1>
      <div className="text-center mt-3">
        <Link to="/about">About</Link> |
        <Link to="/contact">Contact</Link> |
        <Link to="/policy">Privacy Policy</Link>
      </div>
      <div className="text-center mt-3">
      <h6 className="text-center" >
       For any suggestion or bug fix get in touch... 
      </h6>
        {/* Add social media icons here */}
        <a href="https://www.facebook.com">
         <CgFacebook  icon={CgFacebook} size="18px" />
        </a>
        <a href="https://twitter.com/AakashS63115683">
          <SiTwitter icon={SiTwitter} size="18px" />
        </a>
        <a href="https://www.instagram.com/_a_akash_0002/?igshid=YmMyMTA2M2Y%3D">
          <SiInstagram icon={SiInstagram} size="18px" />
        </a>
        <a href="https://wa.me/message/6LXGRUTGFXPOF1">
          <RiWhatsappLine icon={RiWhatsappLine} size="20px" />
        </a>
        <a href="#">
          <RiTelegramLine  icon={RiTelegramLine} size="20px" />
        </a>
        <a href="https://github.com/aakash10802">
          <AiOutlineGithub icon={AiOutlineGithub } size="20px" />
        </a>
        
      </div>
    </div>
  );
};

export default Footer;


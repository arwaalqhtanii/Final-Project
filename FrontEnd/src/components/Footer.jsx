import { FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-[#e1dede] pt-24 pb-6 relative">

      <div className="mb-6 absolute top-0 w-full">
        <img
          src="https://l.top4top.io/p_32171vhnf1.png"
          alt="Decorative Top Border"
          className="w-full md:w-full sm:w-[150%]"
        />
      </div>


      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-10">


        <div className="space-y-4">
        <img className='w-[12vw]' src='https://iili.io/2CaS94e.md.png' ></img>
        <p className="text-[#090202]">
            A safe platform for ticket sales aiming to reduce fraud and scams in the black market.
          </p>
        </div>


        <div className="space-y-4 ">
          <h2 className="  text-xl font-bold text-[#78006e]">Help</h2>
          <ul className="space-y-2 text-[#080202]">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Partnerships</a></li>
          </ul>
        </div>


        <div className="space-y-4">
          <h2 className="text-[#78006e] text-xl font-bold">Stay Connected</h2>
          <div className="flex space-x-4 text-[#000000] ">
          <svg className="w-9" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 1668.56 1221.19" viewBox="0 0 1668.56 1221.19" id="twitter-x">
              <path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
	                	h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z" transform="translate(52.39 -25.059)"></path>
          </svg>
            <Link to="https://wa.me" aria-label="WhatsApp" className="text-2xl">
              <FaWhatsapp />
            </Link>
            <Link to="https://instagram.com" aria-label="Instagram" className="text-2xl">
              <FaInstagram />
            </Link>
          </div>
        </div>


        <div className="space-y-4">
          <h2 className="text-[#78006e] text-xl font-bold">Contact Information</h2>

          <p className="text-[#000000] flex items-center"><MdOutlineMail className="mr-2" /> alqhtaniarwa2@gmail.com
          </p>
          <p className="text-[#000000] flex items-center"><MdOutlineMail className="mr-2"/>htsalhagbani@gmail.com</p>
          <p className="text-[#000000] flex items-center"> <MdOutlineMail className="mr-2"/>waleedalhrbi2001@gmail.com</p>
          <p className="text-[#000000] flex items-center"><MdOutlineMail className="mr-2"/>yohejazi@gmail.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


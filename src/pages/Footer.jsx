import { FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] py-28 relative">
     
      <div className="mb-6 absolute top-0 w-full">
        <img
          src="https://l.top4top.io/p_32171vhnf1.png"
          alt="Decorative Top Border"
          className="w-full md:w-full sm:w-[150%]" 
        />
      </div>

    
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-10">
        
       
        <div className="space-y-4">
          <h1 className="text-[#78006e] text-3xl font-bold">Quicktik</h1>
          <p className="text-[#919191]">
            A safe platform for ticket sales aiming to reduce fraud and scams in the black market.
          </p>
        </div>

        
        <div className="space-y-4 ">
          <h2 className="  text-xl font-bold text-[#78006e]">Help</h2>
          <ul className="space-y-2 text-[#919191]">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Partnerships</a></li>
          </ul>
        </div>

      
        <div className="space-y-4">
          <h2 className="text-[#78006e] text-xl font-bold">Stay Connected</h2>
          <div className="flex space-x-4 text-[#919191] ">
            <a href="https://twitter.com" aria-label="Twitter" className="text-2xl">
              <FaTwitter />
            </a>
            <a href="https://wa.me" aria-label="WhatsApp" className="text-2xl">
              <FaWhatsapp />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>

         
        <div className="space-y-4">
          <h2 className="text-[#78006e] text-xl font-bold">Contact Information</h2>
          <p className="text-[#919191]">123 King Abdullah Street, Riyadh, Saudi Arabia</p>
          <p className="text-[#919191]">Phone: +966 123 456 789</p>
          <p className="text-[#919191]">Email: info@quicktik.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

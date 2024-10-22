import { FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#e1dede] py-28 relative">

      <div className="mb-6 absolute top-0 w-full">
        <img
          src="https://l.top4top.io/p_32171vhnf1.png"
          alt="Decorative Top Border"
          className="w-full md:w-full sm:w-[150%]"
        />
      </div>


      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-10">


        <div className="space-y-4">
          <h1 className="text-[#78006e] text-3xl font-bold">WhiteTik</h1>
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

          <p className="text-[#000000] flex items-center"><MdOutlineMail className="mr-2" /> alqhtaniarwa2@gmail.com
          </p>
          <p className="text-[#000000] flex items-center"><MdOutlineMail className="mr-2"/>htsalhagbani@gmail.com</p>
          <p className="text-[#000000] flex items-center"> <MdOutlineMail className="mr-2"/>waleedalhrbi2001@gmail.com</p>
          <p className="text-[#000000] flex items-center"><MdOutlineMail className="mr-2"/>Email: info@quicktik.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

// import { MdOutlineMail } from "react-icons/md";

// const Footer = () => {
//   return (
//     <footer className="bg-[#e1dede] py-20 relative">
//       {/* Decorative Top Border */}
//       <div className="mb-6 absolute top-0 w-full">
//         <img
//           src="https://l.top4top.io/p_32171vhnf1.png"
//           alt="Decorative Top Border"
//           className="w-full"
//         />
//       </div>

//       {/* Footer Content */}
//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 sm:px-10 pt-12 ">
//         {/* Brand Section */}
//         <div className="space-y-4 bg-[red]">
//           <h1 className="text-[#78006e] text-4xl font-extrabold">WhiteTik</h1>
//           <p className="text-[#090202]">
//             A safe platform for ticket sales aiming to reduce fraud and scams in the black market.
//           </p>
//         </div>

//         {/* Help Section */}
//         {/* <div className="space-y-4">
//           <h2 className="text-xl font-bold text-[#78006e]">Help</h2>
//           <ul className="space-y-2 text-[#080202] text-left">
//             <li><a href="#" className="hover:text-[#78006e] transition-colors">FAQ</a></li>
//             <li><a href="#" className="hover:text-[#78006e] transition-colors">Contact Us</a></li>
//             <li><a href="#" className="hover:text-[#78006e] transition-colors">Partnerships</a></li>
//           </ul>
//         </div> */}

//         {/* Contact Information Section */}
//         <div className="space-y-4 bg-[red] text-right">
//           <h2 className="text-[#78006e] text-xl font-bold ">Contact Information</h2>
//           <p className="text-[#000000] flex items-center ">
//             <MdOutlineMail className="mr-3 text-2xl" /> alqhtaniarwa2@gmail.com
//           </p>
//           <p className="text-[#000000] flex items-center">
//             <MdOutlineMail className="mr-3 text-2xl" /> htsalhagbani@gmail.com
//           </p>
//           <p className="text-[#000000] flex items-center">
//             <MdOutlineMail className="mr-3 text-2xl" /> waleedalhrbi2001@gmail.com
//           </p>
//           <p className="text-[#000000] flex items-center">
//             <MdOutlineMail className="mr-3 text-2xl" /> info@quicktik.com
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import image1 from '../assets/img1.png'
import image2 from '../assets/img2.png'
import image3 from '../assets/img3.png'
const HowToBook = () => {
    return (
    
        <div className="container mx-auto py-28">
  <h2 className="text-3xl font-bold text-purple-900 px-8 mb-6 text-left">How to Book Your Ticket?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
    <div>
      <img src="https://cdn.grintahub.com/public/assets/web/images/waiting-room.webp" alt="Enter Event Icon" className="w-12 h-12 mx-auto mb-2"/>
      <h3 className="text-xl  p-9">Enter the Event</h3>
    </div>
    <div>
      <img src="https://cdn.grintahub.com/public/assets/web/images/ticket.webp" alt="Ticket Icon" className="w-12 h-12 mx-auto mb-2"/>
      <h3 className="text-xl  p-9">Receive Your Ticket</h3>
    </div>
    <div>
      <img src="https://cdn.grintahub.com/public/assets/web/images/credit-card.webp" alt="Payment Icon" className="w-12 h-12 mx-auto mb-2"/>
      <h3 className="text-xl p-9">Make Payment</h3>
    </div>
    <div>
      <img src="https://cdn.grintahub.com/public/assets/web/images/stadium.webp" alt="Select Event Icon" className="w-12 h-12 mx-auto mb-2"/>
      <h3 className="text-xl p-9">Select the Event</h3>
    </div>
  </div>

  <div className="mt-12 bg-slate-100 py-5 flex flex-col items-start">
  <h2 className="text-3xl font-bold text-purple-900 px-8 mb-6">About Us</h2>
  <p className="text-lg text-gray-700 px-6 lg:px-24 leading-relaxed">
    At WhiteTik, we strive to provide a secure and reliable platform for buying and selling tickets. Our goal is to combat fraud and prevent the resale of used tickets in the black market, ensuring a transparent and safe purchasing experience for all users.
  </p>
</div>
<br />
  <div className="mt-12 text-center">
    <h2 className="text-3xl font-bold text-purple-900 px-8 mb-6 text-left">Why Us?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="bg-gray-100  rounded-lg p-6 ">
            <img src={image1} alt="Full Security" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl ">Full Security</h3>
            <p className="text-gray-600 mt-4">
                All tickets offered on our site go through rigorous verification processes to ensure their validity.
            </p>
        </div>
    

        <div className="bg-gray-100  rounded-lg p-6">
            <img src={image2} alt="Ease of Use" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl">Ease of Use</h3>
            <p className="text-gray-600 mt-4">
                A simple and easy-to-use interface helps you get tickets quickly and securely.
            </p>
        </div>

        <div className="bg-gray-100  rounded-lg p-6">
            <img src={image3} alt="Technical Support" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl ">Technical Support</h3>
            <p className="text-gray-600 mt-4">
                Our support team is available 24/7 to answer any questions or resolve any issues you may encounter.
            </p>
        </div>
    </div>
</div>

</div>

    );
};

export default HowToBook;

import image1 from '../assets/img1.png'
import image2 from '../assets/img2.png'
import image3 from '../assets/img3.png'
const HowToBook = () => {
    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9 text-purple-900">How to Book Your Ticket?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/waiting-room.webp" alt="Enter Event Icon" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">Enter the Event</h3>
                </div>
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/ticket.webp" alt="Ticket Icon" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">Receive Your Ticket</h3>
                </div>
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/credit-card.webp" alt="Payment Icon" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">Make Payment</h3>
                </div>
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/stadium.webp" alt="Select Event Icon" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">Select the Event</h3>
                </div>
            </div>

           
            <div className="mt-12 text-left bg-slate-100 py-10">
                <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9 text-purple-900">About Us</h2>
                <p className="text-lg px-6 lg:px-24 leading-relaxed text-gray-700">
                    At Safe Ticket, we strive to provide a secure and reliable platform for buying and selling tickets. Our goal is to combat fraud and prevent the resale of used tickets in the black market, ensuring a transparent and safe purchasing experience for all users.
                </p>
            </div>
           
            <div className="mt-12 text-center">
                <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9 text-purple-900">Why Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    <div>
                        <img src={image1} alt="Full Security" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Full Security</h3>
                        <p className="text-gray-600 mt-4">
                            All tickets offered on our site go through rigorous verification processes to ensure their validity.
                        </p>
                    </div>

                   
                    <div>
                        <img src={image2} alt="Ease of Use" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Ease of Use</h3>
                        <p className="text-gray-600 mt-4">
                            A simple and easy-to-use interface helps you get tickets quickly and securely.
                        </p>
                    </div>

                  
                    <div>
                        <img src={image3} alt="Technical Support" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Technical Support</h3>
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

import { useState } from 'react';
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif';
import MyTicket from '../components/MyTicket';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Purchase from '../components/Purchase';

function Checkteckit() {
    const [ticketForCheck, setTicketForCheck] = useState(true);
    const [purchasePop, setPurchasePop] = useState(false);

    function ignoreTicket() {
        // محتوى الدالة يمكن إضافته هنا لاحقًا
    }

    function popPurchaseform() {
        setPurchasePop(true);
        document.body.style.overflow = 'hidden'; // منع تمرير الصفحة أثناء عرض النافذة
    }

    const handleCloseBuyPopup = () => {
        setPurchasePop(false);
        document.body.style.overflow = 'auto'; // السماح بتمرير الصفحة عند إغلاق النافذة
    };

    return (
        <div>
            <Navbar />
            {purchasePop && (
                <Purchase isOpen={true} onClose={handleCloseBuyPopup} />
            )}
            <div className='w-full h-[100vh] relative'>
                <img className='w-full h-full' src={riyadhseasonboulevard} alt="Riyadh Season Boulevard" />
                <div className='w-full h-full bg-black opacity-80 absolute top-0'></div>
                <div className='max-md:w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-12 items-center'>
                    <div className='text-white font-bold text-3xl'>Waiting for purchase</div>

                    {ticketForCheck ? (
                        <div className='w-full flex justify-center'>
                            <MyTicket
                                title='WWE RAW'
                                location='RIYADH'
                                date='17 - 04'
                                time='7:30 PM'
                                type='GOLD'
                                code='265'
                                status='Available'
                                newPrice='95'
                                Available={true}
                                forbuy={true}
                                ignore={ignoreTicket}
                                purchaseForm={popPurchaseform}
                            />
                        </div>
                    ) : (
                        <div className='w-full h-40'></div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Checkteckit;


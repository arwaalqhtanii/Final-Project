const HowToBook = () => {
    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9">كيف احجز تذكرتي؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/waiting-room.webp" alt="أيقونة الدخول" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">ادخل الفعالية</h3>
                </div>
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/ticket.webp" alt="أيقونة التذكرة" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">استقبل تذكرتك</h3>
                </div>
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/credit-card.webp" alt="أيقونة الدفع" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">ادفع</h3>
                </div>
                <div>
                    <img src="https://cdn.grintahub.com/public/assets/web/images/stadium.webp" alt="أيقونة الاستاد" className="w-12 h-12 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">اختر الفعالية</h3>
                </div>
            </div>
   
        </div>
    );
};

export default HowToBook;

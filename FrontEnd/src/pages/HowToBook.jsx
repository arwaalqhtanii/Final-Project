
import image1 from '../assets/img1.png'
import image2 from '../assets/img2.png'
import image3 from '../assets/img3.png'

const HowToBook = () => {
    return (
        <div className="container mx-auto py-10">
            {/* قسم كيف أحجز تذكرتي */}
            <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9 text-purple-900">كيف احجز تذكرتي؟</h2>
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

            {/* خط فاصل */}
            {/* <hr className="my-12 border-t-1 border-gray-300" /> */}

            {/* قسم من نحن؟ */}
            <div className="mt-12 text-right  bg-slate-100 py-10">
                <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9 text-purple-900">من نحن؟</h2>
                <p className="text-lg px-6 lg:px-24 leading-relaxed text-gray-700">
                    في سيف تيك، نسعى لتوفير منصة آمنة وموثوقة لبيع وشراء التذاكر. نهدف إلى مكافحة الاحتيال ومنع تداول التذاكر المستخدمة في السوق السوداء، لضمان تجربة شراء شفافة وآمنة لجميع المستخدمين.
                </p>
            </div>
            {/* <hr className="my-12 border-t-1 border-gray-300" /> */}
            {/* قسم لماذا نحن؟ */}
            <div className="mt-12 text-center ">
                <h2 className="text-2xl text-center font-bold mb-6 pr-6 pb-9 text-purple-900">لماذا نحن؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* بطاقة الأمان الكامل */}
                    <div>
                        <img src={image1} alt="أمان كامل" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">أمان كامل</h3>
                        <p className="text-gray-600 mt-4">
                            جميع التذاكر المقدمة عبر موقعنا تمر بعمليات تحقق صارمة للتأكد من صلاحيتها.
                        </p>
                    </div>

                    {/* بطاقة سهولة الاستخدام */}
                    <div>
                        <img src={image2} alt="سهولة الاستخدام" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">سهولة الاستخدام</h3>
                        <p className="text-gray-600 mt-4">
                            واجهة بسيطة وسهلة الاستخدام تساعدك في الحصول على التذاكر بسرعة وأمان.
                        </p>
                    </div>

                    {/* بطاقة الدعم الفني */}
                    <div>
                        <img src={image3} alt="دعم فني" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">دعم فني</h3>
                        <p className="text-gray-600 mt-4">
                            فريق دعم متوفر على مدار الساعة للإجابة عن أي استفسارات أو حل أي مشكلات قد تواجهها.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToBook;

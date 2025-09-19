export default function FeatureSection() {
    return (
        <section className="w-full py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12" id="features">
            {/* Left - Phone mockup */}
            <div className="flex-1 relative flex justify-center">
                {/* Phone frame */}
                <div className="w-72 h-[560px] bg-black rounded-[3rem] shadow-2xl overflow-hidden relative z-10">
                    <img
                        src="/images/9.jpg"
                        alt="App Preview"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating cards */}
                <div className="absolute z-10 top-10 -left-16 w-60 bg-white shadow-lg rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700">VISA Debit VPBank</p>
                    <p className="text-xs text-gray-500">50,000.000đ / tháng</p>
                </div>

                <div className="absolute z-10 -top-8 -right-16 w-64 bg-blue-600 text-white shadow-xl rounded-xl p-4">
                    <p className="text-sm font-semibold">🎉 Chào mừng tới GIMO!</p>
                    <p className="text-xs">Tìm hiểu về GIMO ›</p>
                </div>

                <div className="absolute z-10 bottom-28 -left-12 w-64 bg-black text-white shadow-xl rounded-xl p-4">
                    <p className="text-sm font-semibold">🔔 Điền thông tin cá nhân</p>
                    <p className="text-xs">Để có điểm tín dụng cao hơn</p>
                </div>

                <div className="absolute z-10 bottom-8 -right-12 w-64 bg-white shadow-lg rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700">Hồ sơ thẻ đã được duyệt</p>
                    <p className="text-xs text-gray-500">15/06/2019</p>
                </div>
            </div>

            {/* Right - Content */}
            <div className="flex-1">
                <h3 className="text-gray-500 font-medium mb-2">Dynamic Homescreen</h3>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                    Do what you need to do, <br /> See what you need to see
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Don’t you just hate it when visiting an app and you see the same things
                    over and over again? Our homescreen is dynamic, with cards tailored to provide
                    important details according to your situation — whether you’re onboarding,
                    have pending requests, need actions, or completed tasks.
                </p>
            </div>
        </section>
    );
}

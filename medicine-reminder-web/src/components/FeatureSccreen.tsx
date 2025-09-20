export default function FeatureSection() {
    return (
        <section
            id="features"
            className="w-full py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12"
        >
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

                {/* Floating reminder cards */}
                <div className="absolute z-10 top-10 -left-16 w-60 bg-white shadow-lg rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700">💊 Morning Dose</p>
                    <p className="text-xs text-gray-500">Take 1 tablet of Vitamin D</p>
                </div>

                <div className="absolute z-10 -top-8 -right-16 w-64 bg-[#1b9a8f] text-white shadow-xl rounded-xl p-4">
                    <p className="text-sm font-semibold">⏰ Time to take your medicine!</p>
                    <p className="text-xs">Don’t miss your scheduled dose</p>
                </div>

                <div className="absolute z-10 bottom-28 -left-12 w-64 bg-black text-white shadow-xl rounded-xl p-4">
                    <p className="text-sm font-semibold">📋 Refill Reminder</p>
                    <p className="text-xs">Your prescription is running low</p>
                </div>

                <div className="absolute z-10 bottom-8 -right-12 w-64 bg-white shadow-lg rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700">✅ Evening Dose Completed</p>
                    <p className="text-xs text-gray-500">Marked on 20/09/2025</p>
                </div>
            </div>

            {/* Right - Content */}
            <div className="flex-1">
                <h3 className="text-gray-500 font-medium mb-2">Smart Notifications</h3>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                    Do what you need to do, <br /> Take meds when you need to take them
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Our dynamic reminder system ensures you always stay on schedule. From
                    morning vitamins to evening prescriptions, the app adapts to your
                    routine and shows you the right reminder at the right time — whether
                    it’s time to take a dose, log your progress, or refill your
                    prescription.
                </p>
            </div>
        </section>
    );
}

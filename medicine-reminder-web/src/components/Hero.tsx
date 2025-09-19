export default function HeroSection() {
    return (
        <section className="w-full py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12" id="home">
            {/* Left Content */}
            <div className="flex-1">
                <h3 className="text-gray-500 font-medium mb-2">Next steps</h3>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                    Stay on track with <span className="text-[#1b9a8f]">Medicine Reminders</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Never miss your dose again! With smart scheduling, reminders, and daily
                    tracking, our app helps you manage your medicines with ease and peace of mind.
                    Set your morning, noon, and evening reminders for better health and consistency.
                </p>
            </div>

            {/* Right Content - Phone mockups */}
            <div className="flex-1 flex justify-center items-center relative">
                {/* First Phone */}
                <div className="w-64 h-[500px] rounded-3xl shadow-2xl overflow-hidden relative z-10">
                    <img
                        src="/images/8.jpg"
                        alt="Medicine Reminder Form"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Second Phone - behind with offset */}
                <div className="w-64 h-[500px] rounded-3xl shadow-2xl overflow-hidden absolute top-10 -right-20 z-0 ">
                    <img
                        src="/images/2.jpg"
                        alt="Medicine Reminder Login"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

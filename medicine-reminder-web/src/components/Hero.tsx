export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative w-full py-20 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden"
        >
            {/* Left Content */}
            <div className="flex-1 z-10">
                <h3 className="text-gray-500 font-medium mb-3 uppercase tracking-wide">
                    Next steps
                </h3>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-snug">
                    Stay on track with{" "}
                    <span className="text-[#1b9a8f]">Medicine Reminders</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                    Never miss your dose again! With smart scheduling, reminders, and
                    daily tracking, our app helps you manage your medicines with ease and
                    peace of mind. Set your morning, noon, and evening reminders for
                    better health and consistency.
                </p>
            </div>

            {/* Right Content - Phone mockups */}
            <div className="flex-1 flex justify-center items-center relative">
                {/* Front Phone */}
                <div className="w-64 h-[500px] rounded-3xl shadow-2xl overflow-hidden relative z-20 transform transition duration-500 hover:scale-105 hover:rotate-1">
                    <img
                        src="/images/8.jpg"
                        alt="Medicine Reminder Form"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Back Phone */}
                <div className="w-64 h-[500px] rounded-3xl shadow-xl overflow-hidden absolute top-12 -right-20 z-10 transform mr-1">
                    <img
                        src="/images/2.jpg"
                        alt="Medicine Reminder Login"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}

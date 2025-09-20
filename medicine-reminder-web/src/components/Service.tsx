export default function ServiceDetailsSection() {
    return (
        <section
            id="services"
            className="w-full py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12 mb-16"
        >
            {/* Left - Content */}
            <div className="flex-1">
                <h3 className="text-[#1b9a8f] italic mb-3">Service Details</h3>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                    Two types of services: <br /> Reminders and Tracking
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Users can set reminders for their daily medicines, including dosage
                    and timing, so they never miss an important pill. The app also tracks
                    history, provides refill alerts, and allows customization for
                    different types of medicines. Each reminder can be personalized to
                    suit the user’s health needs.
                </p>

                <div className="mt-8 flex gap-4">
                    <button className="px-6 py-3 bg-[#1b9a8f] text-white rounded-xl font-medium shadow-md hover:bg-[#0f867c] transition">
                        Set a Reminder
                    </button>
                </div>
            </div>

            {/* Right - Phone Screens */}
            <div className="flex-1 relative flex justify-center">
                {/* Left tilted screen */}
                <div className="w-64 h-[520px] bg-white rounded-[2rem] shadow-xl overflow-hidden absolute -left-6 top-6 z-0 transform rotate-[-6deg] hover:scale-105 transition">
                    <img
                        src="/images/5.jpg"
                        alt="Medicine Schedule"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Center front screen */}
                <div className="w-64 h-[520px] bg-white rounded-[2rem] shadow-2xl overflow-hidden relative z-10 hover:scale-105 transition">
                    <img
                        src="/images/7.jpg"
                        alt="Reminder List"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Right tilted screen */}
                <div className="w-64 h-[520px] bg-white rounded-[2rem] shadow-xl overflow-hidden absolute -right-6 top-6 z-0 transform rotate-[6deg] hover:scale-105 transition">
                    <img
                        src="/images/6.jpg"
                        alt="Medicine Tracking"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
}

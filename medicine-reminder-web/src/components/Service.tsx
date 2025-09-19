export default function ServiceDetailsSection() {
    return (
        <section className="w-full py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12 mb-16 " id="services">
            {/* Left - Content */}
            <div className="flex-1">
                <h3 className="text-gray-500 italic mb-2">Service details</h3>
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
            </div>

            {/* Right - Phone Screens */}
            <div className="flex-1 relative flex justify-center">
                {/* Back screen */}
                <div className="w-64 h-[520px] bg-white rounded-[2rem] shadow-xl overflow-hidden absolute left-0 top-4 z-1">
                    <img
                        src="/images/5.jpg"
                        alt="Medicine Schedule"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Front screen */}
                <div className="w-64 h-[520px] bg-white rounded-[2rem] shadow-2xl overflow-hidden relative z-10">
                    <img
                        src="/images/7.jpg"
                        alt="Reminder List"
                        className="w-full h-full object-contain"
                    />
                </div>
                {/* back screenm  */}
                <div className="w-64 h-[520px] bg-white rounded-[2rem] shadow-xl overflow-hidden absolute right-0 top-4 z-1">
                    <img
                        src="/images/6.jpg"
                        alt="Medicine Schedule"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
}

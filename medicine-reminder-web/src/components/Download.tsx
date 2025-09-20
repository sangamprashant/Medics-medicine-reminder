const Download = () => {
    return (
        <section
            id="download"
            className="w-full bg-[#1b9a8f] text-white py-20 px-6 lg:px-20 flex flex-col items-center justify-center text-center rounded-2xl shadow-lg"
        >
            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Download the <span className="text-yellow-300">Medicine Reminder</span> App
            </h2>
            <p className="text-lg max-w-2xl mb-8 text-gray-100">
                Stay consistent with your medicines and never miss a dose again.
                Available now on Android and iOS.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <a
                    href="#"
                    className="bg-black text-white flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
                >
                    <img src="/images/google-play.png" alt="Google Play" className="h-6" />
                    <span className="text-sm text-left leading-tight">
                        <span className="block text-xs">Get it on</span>
                        <strong>Google Play</strong>
                    </span>
                </a>

                <a
                    href="#"
                    className="bg-black text-white flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
                >
                    <img src="/images/app-store.png" alt="App Store" className="h-6" />
                    <span className="text-sm text-left leading-tight">
                        <span className="block text-xs">Download on the</span>
                        <strong>App Store</strong>
                    </span>
                </a>
            </div>
        </section>
    );
};

export default Download;

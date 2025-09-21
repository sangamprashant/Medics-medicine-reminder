const Download = () => {
    const downloadLinks = [
        {
            id: 4,
            href: "#", // replace with your APK link
            img: "/images/pure-apk.png",
            smallText: "Direct",
            bigText: "APK Download",
        },
        {
            id: 5,
            href: "https://github.com/sangamprashant/Medics-medicine-reminder",
            img: "/images/github.png",
            smallText: "View on",
            bigText: "GitHub Repo",
        },
    ];

    return (
        <section
            id="download"
            className="w-full bg-[#1b9a8f] text-white py-20 px-6 lg:px-20 flex flex-col items-center justify-center text-center rounded-2xl shadow-lg m-1"
        >
            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Download the <span className="text-yellow-300">Medicine Reminder</span> App
            </h2>
            <p className="text-lg max-w-2xl mb-12 text-gray-100">
                Stay consistent with your medicines and never miss a dose again.
                Choose the APK file or explore the source code on GitHub.
            </p>

            {/* Download Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center w-full max-w-2xl">
                {downloadLinks.map((link) => (
                    <div className="flex justify-center" key={link.id}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white flex items-center gap-3 px-10 py-3 rounded-xl shadow-lg hover:opacity-90 transition text-nowrap justify-center w-min"
                        >
                            <img src={link.img} alt={link.bigText} className="h-6" loading="lazy" />
                            <span className="text-sm text-left leading-tight">
                                <span className="block text-xs">{link.smallText}</span>
                                <strong>{link.bigText}</strong>
                            </span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Download;

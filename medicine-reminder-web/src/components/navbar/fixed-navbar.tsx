import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FixedNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollIds = ["home", "features", "download", "services"];

    const handleNavClick = (sectionId: string) => {

        if (scrollIds.includes(sectionId)) {
            navigate("/")
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
            return;
        }

        if (sectionId === "privacy-policy") {
            window.open("https://www.privacypolicygenerator.info/live.php?token=VtW7bXQK0v6QK1k1bR2lYf3gY9v3f3gY", "_blank");
        }
    };

    return (
        <div
            className={`w-full h-min  fixed top-0 left-0 z-20 bg-[#1b9a8f] transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-none"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between p-6">
                <div className="text-white font-bold text-xl">Medics.</div>
                <nav>
                    <ul className="flex space-x-6 text-white">
                        <li className="hover:text-gray-300 cursor-pointer" onClick={
                            () => handleNavClick("home")
                        }>Home</li>
                        <li className="hover:text-gray-300 cursor-pointer" onClick={
                            () => handleNavClick("features")
                        }>Features</li>
                        <li className="hover:text-gray-300 cursor-pointer" onClick={
                            () => handleNavClick("download")
                        }>Download</li>
                        <li className="hover:text-gray-300 cursor-pointer" onClick={
                            () => handleNavClick("services")
                        }>Services</li>
                        <li className="hover:text-gray-300 cursor-pointer" onClick={
                            () => handleNavClick("privacy-policy")
                        }>Privacy Policy</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default FixedNavbar;

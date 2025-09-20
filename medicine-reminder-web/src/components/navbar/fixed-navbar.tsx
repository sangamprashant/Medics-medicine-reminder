import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FixedNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollIds = ["home", "features", "download", "services"];

    const handleNavClick = (sectionId: string) => {
        setIsMenuOpen(false); // close menu on click

        if (scrollIds.includes(sectionId)) {
            navigate("/");
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
            return;
        }

        if (sectionId === "privacy-policy") {
            navigate("/privacy-policy");
            return;
        }
    };

    return (
        <header
            className={`w-full fixed top-0 left-0 z-20 transition-all duration-300 ${isScrolled ? "bg-[#1b9a8f] shadow-md" : "bg-[#1b9a8f]"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div
                    className="text-white font-bold text-2xl cursor-pointer"
                    onClick={() => handleNavClick("home")}
                >
                    Medics.
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex">
                    <ul className="flex space-x-8 text-white font-medium">
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("home")}
                        >
                            Home
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("features")}
                        >
                            Features
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("download")}
                        >
                            Download
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("services")}
                        >
                            Services
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("privacy-policy")}
                        >
                            Privacy Policy
                        </li>
                    </ul>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <nav className="md:hidden bg-[#1b9a8f] shadow-lg">
                    <ul className="flex flex-col space-y-4 p-6 text-white font-medium">
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("home")}
                        >
                            Home
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("features")}
                        >
                            Features
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("download")}
                        >
                            Download
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("services")}
                        >
                            Services
                        </li>
                        <li
                            className="hover:text-gray-200 cursor-pointer"
                            onClick={() => handleNavClick("privacy-policy")}
                        >
                            Privacy Policy
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default FixedNavbar;

import { FeatureSection, FixedNavbar, FooterBackground, ServiceDetailsSection } from "./components"
import HeroSection from "./components/Hero"
import NavbarBackground from "./components/navbar/navbar-background"

const App = () => {
  return (
    <div className="relative overflow-hidden">
      <FixedNavbar />
      <NavbarBackground />
      <FooterBackground />
      <div className="container mx-auto relative z-10 ">
        <HeroSection />
        <FeatureSection />
        <ServiceDetailsSection />
      </div>
    </div>
  )
}

export default App

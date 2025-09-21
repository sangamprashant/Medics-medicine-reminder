import { Route, Routes } from "react-router-dom"
import { FixedNavbar, FooterBackground } from "./components"
import NavbarBackground from "./components/navbar/navbar-background"
import { Home, PrivicyPolicy } from "./pages"

const App = () => {
  return (
    <div className="relative overflow-hidden">
      <FixedNavbar />
      <NavbarBackground />
      <FooterBackground />
      <div className="container mx-auto relative z-10">
        <Routes>
          <Route path="/privacy-policy" element={<PrivicyPolicy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

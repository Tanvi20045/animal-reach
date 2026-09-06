import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ReportAnimal from "./pages/ReportAnimal.jsx";
import Adopt from "./pages/Adopt.jsx";
import Rescue from "./pages/Rescue.jsx";
import Donate from "./pages/Donate.jsx";
import Volunteer from "./pages/Volunteer.jsx";

export default function App() {
  const progressRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progressRef.current) progressRef.current.style.width = scrolled + "%";
    };
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <div id="scroll-progress" ref={progressRef}></div>
      <div id="cursor-glow" ref={glowRef} className="hidden md:block"></div>
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
      <div className="bg-blob bg-blob-3"></div>
      <div className="bg-blob bg-blob-4"></div>

      <Navbar />
      <main className="flex-1 grain relative" style={{ zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportAnimal />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/rescue" element={<Rescue />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
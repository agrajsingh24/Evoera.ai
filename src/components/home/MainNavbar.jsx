import React, { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const SECTIONS = ["home", "about", "features", "analytics", "join", "contact"];

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);

  // Scroll hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // IntersectionObserver to update active link
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // section considered 'in view' when middle is visible
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to section accounting for fixed navbar height
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // header height (use navRef if available)
    const navHeight = navRef.current ? navRef.current.offsetHeight : 80;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12; // small extra offset
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black border-b border-[#00ff9d30]
      transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-semibold tracking-wide text-[#00ff9d] drop-shadow-[0_0_10px_#00ff9d]">
            Evora
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {SECTIONS.map((item) => (
            <button
              key={item}
              onClick={() => {
                scrollToId(item);
                setActive(item);
              }}
              className="relative group transition focus:outline-none"
            >
              <span
                className={`transition ${active === item ? "text-[#00ff9d]" : ""
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>

              {/* hover/active underline glow */}
              <span
                className={`absolute left-0 -bottom-3 h-2px bg-[#00ff9d] transition-all duration-300 shadow-[0_0_10px_#00ff9d] ${active === item ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </button>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg border border-[#00ff9d50] text-[#00ff9d] hover:shadow-[0_0_15px_#00ff9d] transition"
          aria-label="open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1100px] z-100 backdrop-blur-[20px] border border-border rounded-[18px] px-[22px] py-3.5 flex items-center justify-between transition-all duration-200 ${
          scrolled
            ? "bg-white/96 shadow-[0_4px_32px_rgba(0,0,0,0.1)]"
            : "bg-white/88 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        }`}
      >
        <div className="font-heading font-extrabold text-[17px] text-foreground tracking-[-0.3px] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue shrink-0 animate-pulse-glow" />
          SpyfordSecureOps
        </div>

        <ul className="hidden md:flex items-center gap-7 list-none">
          <li>
            <a
              href="#features"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#platform"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Platform
            </a>
          </li>
          <li>
            <a
              href="#api"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              API
            </a>
          </li>
          <li>
            <a
              href="tel:+13028246398"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              aria-label="Call support at +1 (302) 824-6398"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              className="bg-foreground text-white px-5 py-2.5 rounded-xl font-semibold text-[13px] hover:bg-blue hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-[22px] h-0.5 bg-foreground rounded-sm transition-all" />
          <span className="block w-[22px] h-0.5 bg-foreground rounded-sm transition-all" />
          <span className="block w-[22px] h-0.5 bg-foreground rounded-sm transition-all" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 left-4 right-4 bg-white/97 backdrop-blur-[20px] border border-border rounded-[20px] p-5 z-99 shadow-lg flex-col gap-1 ${
          mobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <a
          href="#features"
          className="px-4 py-3 rounded-xl text-[15px] font-medium text-muted hover:bg-background hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Features
        </a>
        <a
          href="#platform"
          className="px-4 py-3 rounded-xl text-[15px] font-medium text-muted hover:bg-background hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Platform
        </a>
        <a
          href="#api"
          className="px-4 py-3 rounded-xl text-[15px] font-medium text-muted hover:bg-background hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          API
        </a>
        <a
          href="tel:+13028246398"
          className="px-4 py-3 rounded-xl text-[15px] font-medium text-muted hover:bg-background hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact: +1 (302) 824-6398
        </a>
        <a
          href="#"
          className="px-4 py-3 rounded-xl text-[15px] font-semibold text-blue"
          onClick={() => setMobileMenuOpen(false)}
        >
          {"Get Started ->"}
        </a>
      </div>
    </>
  );
}

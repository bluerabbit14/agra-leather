import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isTourPackageOpen, setIsTourPackageOpen] = useState(false);
  const [isTourByDurationOpen, setIsTourByDurationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for "Tour Package"
  const tourPackageRef = useRef(null);
  const mobileTourPackageRef = useRef(null);

  // Refs for "Tour By Duration"
  const tourDurationRef = useRef(null);
  const mobileTourDurationRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Prevent closing if clicking inside mobile menu
      if (mobileMenuRef.current && mobileMenuRef.current.contains(event.target)) {
        return;
      }

      // Handle "Tour Package" closing
      if (isTourPackageOpen) {
        const outsideDesktop = tourPackageRef.current && !tourPackageRef.current.contains(event.target);
        const outsideMobile = !mobileTourPackageRef.current || !mobileTourPackageRef.current.contains(event.target);

        if (outsideDesktop && outsideMobile) {
          setIsTourPackageOpen(false);
        }
      }

      // Handle "Tour By Duration" closing
      if (isTourByDurationOpen) {
        const outsideDesktop = tourDurationRef.current && !tourDurationRef.current.contains(event.target);
        const outsideMobile = !mobileTourDurationRef.current || !mobileTourDurationRef.current.contains(event.target);

        if (outsideDesktop && outsideMobile) {
          setIsTourByDurationOpen(false);
        }
      }
    }

    // Bind listener if ANY dropdown is open
    if (isTourPackageOpen || isTourByDurationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTourPackageOpen, isTourByDurationOpen]);

  const toggleTourPackage = () => {
    setIsTourPackageOpen((prev) => !prev);
  };

  const toggleTourByDuration = () => {
    setIsTourByDurationOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="navbar">
        <nav className="navbar-container">
          {/* Left: Logo */}
          <div className="navbar-logo">
            <a href="/" className="brand-title">Logo</a>
          </div>

          {/* Center: Navigation Links */}
          <ul className="navbar-links">
            <li>
              <a href="/">Home</a>
            </li>

            <li
              className="dropdown"
              ref={tourPackageRef}
              onMouseEnter={() => setIsTourPackageOpen(true)}
              onMouseLeave={() => setIsTourPackageOpen(false)}
            >
              <button
                type="button"
                className="dropdown-toggle"
                onClick={toggleTourPackage}
                aria-expanded={isTourPackageOpen}
              >
                Tour Package <span>▼</span>
              </button>

              <ul className={`dropdown-menu ${isTourPackageOpen ? "show" : ""}`}>
                <li><button type="button">Taj Mahal Tour Package</button></li>
                <li><button type="button">Golden Triangle Tour</button></li>
                <li><button type="button">Rajasthan Tour Package</button></li>
              </ul>
            </li>

            <li
              className="dropdown"
              ref={tourDurationRef}
              onMouseEnter={() => setIsTourByDurationOpen(true)}
              onMouseLeave={() => setIsTourByDurationOpen(false)}
            >
              <button
                type="button"
                className="dropdown-toggle"
                onClick={toggleTourByDuration}
                aria-expanded={isTourByDurationOpen}
              >
                Tour By Duration <span>▼</span>
              </button>

              <ul className={`dropdown-menu ${isTourByDurationOpen ? "show" : ""}`}>
                <li><button type="button">1-2 Days Tour Package</button></li>
                <li><button type="button">3-5 Days Tour Package</button></li>
                <li><button type="button">6-10 Days Tour Package</button></li>
              </ul>
            </li>

            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

          {/* Right: CTA + Hamburger */}
          <div className="navbar-cta">
            <a href="/" className="cta-button">
              Plan My Trip
            </a>

            <button
              type="button"
              className="hamburger"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Side Panel */}
      {isMobileMenuOpen && (
        <aside className="mobile-menu" ref={mobileMenuRef}>
          <button
            type="button"
            className="close-btn"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>

          <ul className="mobile-links">
            <li>
              <a href="/">Home</a>
            </li>

            {/* Mobile Tour Package */}
            <li className="mobile-dropdown" ref={mobileTourPackageRef}>
              <button
                type="button"
                className="mobile-dropdown-toggle"
                onClick={toggleTourPackage}
                aria-expanded={isTourPackageOpen}
              >
                Tour Package <span>▼</span>
              </button>

              {isTourPackageOpen && (
                <ul className="mobile-submenu">
                  <li><button>Taj Mahal Tour Package</button></li>
                  <li><button>Golden Triangle Tour</button></li>
                  <li><button>Rajasthan Tour Package</button></li>
                </ul>
              )}
            </li>

            {/* Mobile Tour By Duration */}
            <li className="mobile-dropdown" ref={mobileTourDurationRef}>
              <button
                type="button"
                className="mobile-dropdown-toggle"
                onClick={toggleTourByDuration}
                aria-expanded={isTourByDurationOpen}
              >
                Tour By Duration <span>▼</span>
              </button>

              {isTourByDurationOpen && (
                <ul className="mobile-submenu">
                  <li><button>1-2 Days Tour Package</button></li>
                  <li><button>3-5 Days Tour Package</button></li>
                  <li><button>6-10 Days Tour Package</button></li>
                </ul>
              )}
            </li>

            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

        </aside>
      )}
    </>
  );
}

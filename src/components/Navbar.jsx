import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Untuk deteksi halaman aktif

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Daftar menu dan rute
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Birdpedia", path: "/birdpedia" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="w-full z-50 sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path d="M19 5L5 19" stroke="white" strokeWidth="2" />
                <path
                  d="M9 9.5C9 9.5 10 7.5 12 7.5C14 7.5 15 9.5 15 9.5"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              <span className="font-bold text-xl text-white">Bird</span>
              <span className="font-bold text-xl text-green-200">Haven</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center items-center flex-1">
            <div className="flex gap-10">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative group font-medium text-white transition-all duration-200 ${
                    location.pathname === item.path ||
                    (item.path === "/birdpedia" &&
                      location.pathname.startsWith("/birdpedia"))
                      ? "border-b-2 border-white"
                      : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-white transition-all duration-300 ${
                      location.pathname === item.path ||
                      (item.path === "/birdpedia" &&
                        location.pathname.startsWith("/birdpedia"))
                        ? "w-full"
                        : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="outline-none focus:outline-none text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-green-600`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)} // Tutup menu pas klik
              className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700 ${
                location.pathname === item.path ||
                (item.path === "/birdpedia" &&
                  location.pathname.startsWith("/birdpedia"))
                  ? "bg-green-700"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
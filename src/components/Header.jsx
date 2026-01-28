import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/realtime", label: "Thống kê" },
    { to: "/stats", label: "Dữ liệu" },
    { to: "/charts", label: "Biểu đồ" },
    { to: "/prediction", label: "Dự đoán" },
    { to: "/about", label: "Giới thiệu & Hướng dẫn" },
  ];

  return (
    // 1. MÀU SẮC: Về lại nền trắng (bg-white) sạch sẽ
    <header className="bg-white shadow-md w-full border-b border-gray-200 py-4">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* 2. LOGO & CHỮ: Xếp dọc (flex-col) và căn giữa */}
          <h1>
            <Link
              to="/realtime"
              className="flex flex-col items-center gap-2 hover:opacity-90 transition-opacity duration-200 text-center" 
            >
              {/* Logo phóng to (w-20 -> w-24/28) */}
              <img 
                src="/wechoice.png" 
                alt="Logo" 
                className="w-24 h-24 md:w-28 md:h-28 object-contain" 
              />
              
              {/* Text tách 2 dòng, màu ĐEN (text-gray-900) */}
              <div className="flex flex-col -mt-1">
                <span className="font-extrabold text-2xl md:text-3xl uppercase text-gray-900 leading-none tracking-tight">
                  WeChoice Awards
                </span>
                <span className="font-bold text-xl md:text-2xl uppercase text-gray-900 leading-none mt-1 tracking-widest">
                  2025 Tracker
                </span>
              </div>
            </Link>
          </h1>

        {/* 3. MENU NAV: Style đen/trắng cũ */}
          <nav className="hidden xl:flex items-center gap-2 bg-gray-100 p-1 rounded-full"> 
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-6 py-2.5 rounded-full font-bold transition-all duration-200 whitespace-nowrap text-sm ${
                  location.pathname === link.to
                    // Active: Nền đen - Chữ trắng
                    ? 'bg-gray-900 text-white shadow-md'
                    // Inactive: Nền trong suốt - Chữ xám
                    : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden absolute top-6 right-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-100 text-gray-900 p-2 hover:bg-gray-200 rounded-lg transition-colors shadow-sm"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-6 flex flex-col gap-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center ${
                  location.pathname === link.to
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

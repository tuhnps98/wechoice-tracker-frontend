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

    // 1. SỬA HEADER: Thay bg-white thành bg-[#8da6bf]

    <header className="bg-[#8da6bf] shadow-lg w-full border-b border-gray-200">

      <div className="w-full px-8 md:px-16 lg:px-14 py-5">

        <div className="flex justify-between items-center">

          

          {/* 2. SỬA LOGO: Thay text-gray-900 thành text-white để nổi trên nền xanh */}

          <h1 className="text-xl md:text-2xl font-bold text-white">

            <Link

              to="/realtime"

              className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200 font-bold text-white" 

            >

              <img src="/wechoice.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />

              <span>WeChoice Awards 2025</span>

            </Link>

          </h1>



        {/* Desktop Navigation */}

          <nav className="hidden xl:flex items-center gap-2"> 

            {navLinks.map((link) => (

              <Link

                key={link.to}

                to={link.to}

                className={`px-6 py-2.5 rounded-full font-bold transition-all duration-200 whitespace-nowrap ${

                  location.pathname === link.to

                    // 3. TRẠNG THÁI ACTIVE: Nền Trắng - Chữ Xanh Đậm (#2c6e8f)

                    ? 'bg-white text-[#2c6e8f] shadow-md'

                    // 4. TRẠNG THÁI INACTIVE: Chữ Trắng - Hover nền trắng mờ

                    : 'bg-transparent text-white hover:bg-white/20'

                }`}

              >

                {link.label}

              </Link>

            ))}

          </nav>



          {/* Mobile Menu Button */}

          <button

            onClick={() => setIsMenuOpen(!isMenuOpen)}

            className="xl:hidden bg-gray-100 text-gray-900 p-2 hover:bg-gray-200 rounded-lg transition-colors shadow-md"

            aria-label="Toggle menu"

          >

            <svg

              className="w-6 h-6"

              fill="none"

              stroke="currentColor"

              viewBox="0 0 24 24"

            >

              {isMenuOpen ? (

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



        {/* Mobile Dropdown Menu */}

        {isMenuOpen && (

          <nav className="xl:hidden mt-4 flex flex-col gap-2">

            {navLinks.map((link) => (

              <Link

                key={link.to}

                to={link.to}

                onClick={() => setIsMenuOpen(false)}

                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center ${

                  location.pathname === link.to

                    ? "bg-[#8da6bf] text-white shadow-lg"

                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"

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

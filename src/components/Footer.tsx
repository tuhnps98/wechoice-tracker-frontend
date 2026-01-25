// @ts-nocheck
/* eslint-disable */
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* WRAPPER CHÍNH */}
        <div className="max-w-7xl mx-auto md:px-8">

          {/* --- PHẦN TRÊN --- */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="space-y-3 text-left">
              <h2 className="text-xl font-extrabold text-gray-900">WeChoice 2025 Tracker</h2>
              <p className="text-gray-900 text-sm leading-relaxed font-normal md:whitespace-nowrap">
                Hệ thống theo dõi và phân tích bình chọn cho giải thưởng WeChoice Awards 2025.
                <br />
                <a 
                  href="https://wechoice.vn" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:underline hover:text-gray-700 transition-colors"
                >
                  Truy cập trang web giải thưởng
                </a>
              </p>
            </div>
          </div>

          {/* Đường gạch ngang */}
          <div className="h-px bg-gray-300 w-full mb-8"></div>

          {/* --- PHẦN DƯỚI --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            
            {/* Copyright */}
            <div className="text-sm text-gray-900 space-y-1 text-center md:text-left">
              <p className="font-bold">Copyright © by WeChoice Awards 2025 & Công ty cổ phần VCCorp.</p>
              <p className="font-normal">
                Phát triển độc lập bởi người hâm mộ{' '}
                <a 
                  href="https://www.facebook.com/profile.php?id=100075664732643" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-bold hover:underline hover:text-gray-700 transition-colors"
                  >
                  Nghệ Sĩ LYHAN.
                </a>
              </p>
            </div>

            {/* Chữ ký */}
            <div className="text-center md:text-right">
              <div className="font-cursive font-bold text-4xl md:text-5xl text-gray-900" style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 700 }}>
                Thank you dancers!
              </div>
            </div>

          </div>

        </div> 
      </div>
    </footer>
  );
}



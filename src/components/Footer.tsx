// ... imports

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* WRAPPER CHÍNH */}
        <div className="max-w-7xl mx-auto md:px-8">

          {/* --- PHẦN TRÊN --- */}
          {/* Thêm items-start hoặc items-center để căn chỉnh theo trục dọc nếu cần */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">

            {/* KHỐI 1: Text bên trái (Giữ nguyên) */}
            <div className="space-y-3 text-left">
              <h2 className="text-xl font-extrabold text-gray-900">WeChoice Awards 2025 Tracker</h2>
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

            {/* KHỐI 2: Logo Eventista bên phải (MỚI THÊM) */}
            <div className="flex items-center justify-start md:justify-end">
                <a 
                  href="https://wechoice.vn/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity" // Hiệu ứng hover nhẹ
                >
                  {/* Thay thế src bằng đường dẫn logo của bạn */}
                  <img 
                    src="/wechoice.png" 
                    alt="WeChoice Logo" 
                    className="h-8 w-auto object-contain" // h-8 sẽ nhỏ hơn h-10
                  />
                </a>
            </div>

          </div>

          {/* Đường gạch ngang (Giữ nguyên) */}
          <div className="h-px bg-gray-300 w-full mb-8"></div>

        {/* --- PHẦN DƯỚI --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Copyright */}
            <div className="text-sm text-gray-900 space-y-1 text-center md:text-left">
              <p className="font-bold">Copyright © 2026 Công ty cổ phần VCCORP. All rights reserved.</p>
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

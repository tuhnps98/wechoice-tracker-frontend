import { useState, useRef, useEffect } from "react";
import axios from "axios"; // Dùng để gọi API
import Error from "../components/Error";

// Interface định nghĩa kiểu dữ liệu
interface Candidate {
  id: number;
  name: string;
  categoryId: string;
  categoryName: string;
  totalVotes: number;
}

interface ApiResponse {
  updatedAt: string;
  data: Candidate[];
}

export default function RealtimePage() {
  const [data, setData] = useState<Record<string, Candidate[]>>({});
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Ref để tính toán số phiếu tăng thêm (realtime diff)
  const prevVotesRef = useRef<Record<number, number>>({});

  // Lấy URL Backend từ biến môi trường
  const BE_URL = import.meta.env.VITE_BE_URL || "";

  useEffect(() => {
    // Hàm gọi dữ liệu từ Backend
    const fetchData = async () => {
      try {
        setConnectionError(null);
        // Gọi API '/realtime' từ Backend của bạn
        const response = await axios.get(`${BE_URL}/realtime`);
        const payload = response.data as ApiResponse;

        if (!payload || !payload.data) {
          setIsLoading(false);
          return;
        }

        setUpdatedAt(new Date(payload.updatedAt));

        const payloadData = Array.isArray(payload.data)
          ? (payload.data as Candidate[])
          : [];

        // Tính toán chênh lệch vote (nếu cần hiển thị +vote)
        payloadData.forEach((item) => {
          prevVotesRef.current[item.id] = item.totalVotes;
        });

        // Nhóm ứng viên theo Hạng mục (Category)
        const grouped = payloadData.reduce<Record<string, Candidate[]>>(
          (acc, item) => {
            const key = item.categoryName || "Khác";
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
          },
          {}
        );

        // Sắp xếp ứng viên trong từng hạng mục (người cao vote nhất lên đầu)
        Object.keys(grouped).forEach((category) => {
          grouped[category].sort((a, b) => b.totalVotes - a.totalVotes);
        });

        setData(grouped);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching realtime data:", error);
        setConnectionError("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    // Gọi lần đầu ngay khi vào trang
    fetchData();

    // Tự động cập nhật mỗi 10 giây (Auto-refresh)
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [BE_URL]);

  return (
    <div className="px-4 xl:px-8 py-10 max-w-[98%] mx-auto font-sans">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 pb-2 text-gray-900 uppercase tracking-tight">
          WeChoice Awards 2025
        </h1>
        
        {/* Trạng thái Loading / Update */}
        {isLoading && !updatedAt && !connectionError ? (
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-gray-600 text-sm font-medium">Đang kết nối...</span>
          </div>
        ) : connectionError ? (
          <Error message={connectionError} />
        ) : updatedAt ? (
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-gray-600 text-sm">
              Cập nhật lúc:{" "}
              <span className="font-bold text-gray-900">
                {updatedAt.toLocaleTimeString("vi-VN")}
              </span>
            </span>
          </div>
        ) : null}
      </div>

      {/* Grid Layout: Hiển thị dạng Thẻ (Card) như yêu cầu */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        {Object.entries(data).map(([category, candidates]) => (
          <div
            key={category}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            {/* Header của Card - Tên hạng mục */}
            <div className="bg-gray-900 p-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-white text-center uppercase tracking-wide">
                {category}
              </h2>
            </div>

            {/* Danh sách ứng viên bên trong */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 w-[70%]">Ứng viên</th>
                    <th className="px-4 py-3 text-right">Bình chọn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidates.map((c, index) => {
                    // Top 1, 2, 3 có màu đặc biệt
                    const rankColor = 
                      index === 0 ? "text-yellow-600" : 
                      index === 1 ? "text-gray-500" : 
                      index === 2 ? "text-amber-700" : "text-gray-400";
                    
                    const isTop = index < 3;

                    return (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 align-middle">
                          <div className="flex items-start gap-3">
                            <span className={`font-bold min-w-[20px] ${rankColor}`}>
                              #{index + 1}
                            </span>
                            <span className={`font-medium leading-snug ${isTop ? 'text-gray-900' : 'text-gray-700'}`}>
                              {c.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900 whitespace-nowrap align-middle">
                          {c.totalVotes.toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

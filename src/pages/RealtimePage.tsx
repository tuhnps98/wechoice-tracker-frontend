import { useState, useEffect } from "react";
import axios from "axios";
import Error from "../components/Error";

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
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const BE_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    if (!BE_URL) return;
    try {
      const response = await axios.get(`${BE_URL}/realtime`);
      const payload = response.data as ApiResponse;
      
      setConnectionError(null);

      if (!payload || !payload.data) {
        setIsLoading(false);
        return;
      }

      setUpdatedAt(new Date(payload.updatedAt));

      const payloadData = Array.isArray(payload.data)
        ? (payload.data as Candidate[])
        : [];

      const grouped = payloadData.reduce<Record<string, Candidate[]>>(
        (acc, item) => {
          const key = item.categoryName || "Khác";
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        },
        {}
      );

      Object.keys(grouped).forEach((category) => {
        grouped[category].sort((a, b) => b.totalVotes - a.totalVotes);
      });

      setData(grouped);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi tải dữ liệu realtime:", error);
      setConnectionError("Không thể kết nối đến server. Đang thử lại...");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 xl:px-8 py-10 max-w-[98%] mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-2">
          Kết quả bình chọn trực tiếp
        </h1>
        
        {isLoading && !updatedAt && !connectionError && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-gray-600">Đang tải dữ liệu từ WeChoice...</span>
          </div>
        )}

        {connectionError && <Error message={connectionError} />}

        {updatedAt && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-gray-700 text-sm md:text-base">
              Cập nhật lần cuối:{" "}
              <span className="font-semibold text-gray-900">
                {updatedAt.toLocaleString("vi-VN")}
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
        {Object.entries(data).map(([category, candidates]) => (
          <div key={category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 p-5">
              <h2 className="text-xl font-bold text-white text-center">
                {category}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left font-semibold text-gray-700 w-2/3">Ứng viên</th>
                    <th className="p-3 text-center font-semibold text-gray-700">Tổng bình chọn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidates.map((c, index) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {index < 3 && (
                            <span className="text-sm font-bold text-amber-700">
                              #{index + 1}
                            </span>
                          )}
                          <span className="font-medium text-gray-800">
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center font-semibold text-gray-900">
                        {c.totalVotes.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

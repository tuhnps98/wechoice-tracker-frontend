import { useState, useRef, useEffect } from "react";
import candidatesData from "../info/candidates.json";
import Error from "../components/Error";
import finalResult from "../info/final_result.json";

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

  const prevVotesRef = useRef<Record<number, number>>({});

  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [voteChanges, setVoteChanges] = useState<Record<number, number>>({});
  
  useEffect(() => {
    try {
      const payload = finalResult as ApiResponse;
      setConnectionError(null);

      if (!payload || !payload.data) {
        setIsLoading(false);
        return;
      }

      setUpdatedAt(new Date(payload.updatedAt));

      const payloadData = Array.isArray(payload.data)
        ? (payload.data as Candidate[])
        : [];

      const diff: Record<number, number> = {};
      payloadData.forEach((item) => {
        const previousVoteCount = prevVotesRef.current[item.id] ?? 0;
        diff[item.id] = item.totalVotes - previousVoteCount;
        prevVotesRef.current[item.id] = item.totalVotes;
      });

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

      // --- CHÈN ĐOẠN NÀY VÀO TRƯỚC setData(grouped) ---
const changes: Record<number, number> = {};
// Duyệt qua tất cả ứng viên mới lấy về để so sánh
Object.values(grouped).flat().forEach((cand: Candidate) => {
  // Lấy số vote cũ từ Ref (dòng 23 bạn đã có sẵn)
  const oldVote = prevVotesRef.current[cand.id] || 0;
  
  if (oldVote > 0 && cand.totalVotes > oldVote) {
    // Nếu vote mới > vote cũ thì lưu số chênh lệch
    changes[cand.id] = cand.totalVotes - oldVote;
  }
  
  // Cập nhật lại số vote mới nhất vào Ref để dùng cho lần sau
  prevVotesRef.current[cand.id] = cand.totalVotes;
});
setVoteChanges(changes); // Lưu thay đổi vào State
      setData(grouped);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading final results:", error);
      setConnectionError("Không thể đọc dữ liệu kết quả cuối cùng.");
      setIsLoading(false);
    }
    // run once on mount
  }, []);

  return (
    <div className="px-4 xl:px-8 py-10 max-w-[98%] mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-2">
          Kết quả bình chọn
        </h1>
        {isLoading && !updatedAt && !connectionError ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md flex-wrap justify-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-gray-600">Đang tải dữ liệu...</span>
          </div>
        ) : connectionError ? (
          <Error message={connectionError} />
        ) : updatedAt ? (
          <>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md flex-wrap justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-700 text-sm md:text-base">
                Cập nhật lần cuối lúc:{" "}
                <span className="font-semibold text-gray-900">
                  {new Date(updatedAt).toLocaleString("vi-VN")}
                </span>
              </span>
            </div>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full max-w-7xl mx-auto w-full">
        {Object.entries(data).map(([category, candidates], idx) => (
          <div
            key={category}
            className="bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="bg-gray-900 p-5">
              <h2 className="text-xl font-bold text-white text-center">
                {category}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
  <tr className="bg-gray-100">
    <th className="p-3 text-left font-semibold text-gray-700 w-2/3">
      Ứng viên
    </th>
    {/* Cột Tổng bình chọn đưa lên trước */}
    <th className="p-3 text-center font-semibold text-gray-700">
      Bình chọn
    </th>
    {/* Cột Thay đổi đưa xuống sau cùng */}
    <th className="p-3 text-center font-semibold text-gray-700 w-[100px] hidden md:table-cell">
      Thay đổi
    </th>
  </tr>
</thead>
                <tbody className="divide-y divide-gray-100">
                  {candidates.map((c, index) => {
                    const isHighlighted = c.name.includes("TPB") || c.name.includes("SHB");
                    return (
                      <tr
                        key={c.id}
                        className={`transition-colors duration-200 ${
                          isHighlighted
                            ? "bg-red-50 hover:bg-red-100"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {index < 3 && (
                              <span className="text-sm font-bold text-amber-700">
                                #{index + 1}
                              </span>
                            )}
                            <span
                              className={`font-medium break-words ${
                                isHighlighted
                                  ? "text-rose-700 font-semibold"
                                  : "text-gray-800"
                              }`}
                            >
                              {c.name || "Không rõ"}
                            </span>
                          </div>
                        </td>
                        {/* --- CỘT 2: TỔNG BÌNH CHỌN (Đưa lên trước) --- */}
                  <td
                    className={`p-3 text-center font-semibold whitespace-nowrap ${
                      isHighlighted ? "text-rose-700" : "text-gray-900"
                    }`}
                  >
                    {c.totalVotes.toLocaleString()}
                  </td>

                  {/* --- CỘT 3: THAY ĐỔI (Đưa ra sau cùng) --- */}
                  <td className="p-3 text-center hidden md:table-cell">
                    {voteChanges[c.id] ? (
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                        +{voteChanges[c.id].toLocaleString('vi-VN')}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">-</span>
                    )}
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

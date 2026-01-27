import { useEffect, useState } from "react";
import axios from "axios";

export default function CategorySelector({ onSelect }) {
  const [categories, setCategories] = useState([]);
  // Lấy link backend từ biến môi trường
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Gọi API lấy danh sách hạng mục thật từ Backend
    if (apiUrl) {
      axios.get(`${apiUrl}/category`)
        .then(res => {
          setCategories(res.data);
          // (Tuỳ chọn) Tự động chọn hạng mục đầu tiên nếu muốn
          // if (res.data && res.data.length > 0) onSelect(res.data[0].id);
        })
        .catch(err => console.error("Lỗi tải danh mục:", err));
    }
  }, [apiUrl]);

  return (
    <select
      className="max-w-4xl w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-400 text-gray-700 font-medium cursor-pointer"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="" className="text-gray-500">
        -- Chọn hạng mục --
      </option>
      {categories.map((c) => (
        <option key={c.id} value={c.id} className="py-2">
          {c.name}
        </option>
      ))}
    </select>
  );
}

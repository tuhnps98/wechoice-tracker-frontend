// @ts-nocheck
/* eslint-disable */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

// Import các trang
import RealtimePage from "./pages/RealtimePage";
import StatsPage from "./pages/StatsPage";
import PredictionPage from "./pages/PredictionPage";
import AboutPage from "./pages/AboutPage";
import ChartPage from "./pages/ChartPage";
import EmptyPage from "./pages/EmptyPage";

// Import Header/Footer
import Header from "./components/Header";
import Footer from './components/Footer';

// Layout chung cho tất cả các trang
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full mb-[20px] min-h-[calc(100vh-80px)]">
        <div className="w-full px-4 md:px-6 py-8">
          <Outlet /> 
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Trang chủ tự động chuyển hướng về realtime */}
          <Route index element={<Navigate to="/realtime" replace />} />
          
          <Route path="/realtime" element={<RealtimePage />} />
          
          {/* SỬA TẠI ĐÂY: Đổi /history thành /stats cho khớp với Header */}
          <Route path="/stats" element={<StatsPage />} />
          
          {/* SỬA TẠI ĐÂY: Đổi /chart thành /charts (thêm s) cho khớp với Header */}
          <Route path="/charts" element={<ChartPage />} />
          
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Trang lỗi 404 */}
          <Route path="*" element={<EmptyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

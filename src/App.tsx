import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AuthGuard from './components/AuthGuard.tsx';
import type { UserRole } from './contexts/AuthContext.tsx';
import Header from './components/Header.tsx';
import { SearchProvider } from './contexts/SearchContext';

// ページコンポーネントのインポート
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import CustomerDashboard from './pages/CustomerDashboard.tsx';

// ダミーコンポーネント
const AdminUsers = () => <h2>管理者: ユーザー管理</h2>;
const CustomerProfile = () => <h2>顧客: プロフィール設定</h2>;
const Error404 = () => <h1>404 Not Found - ページが見つかりません</h1>;
const CommonSettings = () => <h1>共通設定ページ (認証済み全員アクセス可)</h1>;


const App: React.FC = () => (
  <SearchProvider> 
    <Header />
    <main style={{ padding: '20px' }}>
      <Routes>
        
        {/* ======================= 1. 公開ルート ======================= */}
        <Route path="/" element={<Home />} />
        
        {/* ログインページ: 認証済みユーザーはリダイレクトされる (isPublicOnly) */}
        <Route 
          path="/login" 
          element={<AuthGuard isPublicOnly><Login /></AuthGuard>} 
        />

        {/* ======================= 2. 顧客ルート (CUSTOMERのみ) ======================= */}
        <Route 
          path="/customer" 
          element={<AuthGuard allowedRoles={['CUSTOMER']}><Outlet /></AuthGuard>}
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* ======================= 3. 管理者ルート (ADMINのみ) ======================= */}
        <Route 
          path="/admin" 
          element={<AuthGuard allowedRoles={['ADMIN']}><Outlet /></AuthGuard>}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        
        {/* ======================= 4. 共通認証済みルート ======================= */}
        <Route 
          path="/settings" 
          // ADMINまたはCUSTOMERのみアクセス可
          element={<AuthGuard allowedRoles={['ADMIN', 'CUSTOMER']}><CommonSettings /></AuthGuard>}
        />

        {/* 404 ルート */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </main>
  </SearchProvider>
);

export default App;

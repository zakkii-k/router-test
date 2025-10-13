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


// 💡 AdminHeaderをインポート
import AdminLayout from './layouts/AdminLayout.tsx';

// ... ページコンポーネントのインポート (Home, Loginなど)

// 💡 共通のメインコンテンツコンテナ (顧客/一般用)
const DefaultLayout = () => (
    <>
        <Header />
        <main style={{ padding: '20px' }}>
            <Outlet />
        </main>
    </>
);


const App: React.FC = () => (
  <SearchProvider> 
    <Routes>
        
        {/* ======================= 1. 公開/顧客ルート (DefaultLayoutを使用) ======================= */}
        <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route 
                path="/login" 
                element={<AuthGuard isPublicOnly><Login /></AuthGuard>} 
            />

            <Route 
                path="/customer" 
                element={<AuthGuard allowedRoles={['CUSTOMER']}><Outlet /></AuthGuard>}
            >
                <Route path="dashboard" element={<CustomerDashboard />} />
                <Route path="profile" element={<CustomerProfile />} />
            </Route>
            
            <Route 
                path="/settings" 
                element={<AuthGuard allowedRoles={['ADMIN', 'CUSTOMER']}><CommonSettings /></AuthGuard>}
            />
        </Route>
        
        {/* ======================= 2. 管理者ルート (AdminLayoutを使用) ======================= */}
        {/* AuthGuardをAdminLayoutの外側に置いて、権限チェック後にAdminLayoutを表示 */}
        <Route 
          path="/admin" 
          element={<AuthGuard allowedRoles={['ADMIN']}><AdminLayout /></AuthGuard>}
        >
          {/* AdminLayoutが<main>と<AdminHeader>を含むため、Outlet経由で表示 */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* 404 ルート (DefaultLayoutの外側で定義) */}
        <Route path="*" element={<Error404 />} />
    </Routes>
  </SearchProvider>
);

export default App;

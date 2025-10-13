import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader.tsx';
// App.tsxで使っているSearchProviderやAuthGuardが必要な場合は、ここで囲むか、App.tsx側で囲む

const AdminLayout: React.FC = () => (
    <>
        <AdminHeader />
        <main style={{ padding: '20px' }}>
            <Outlet /> {/* 子ルート（AdminDashboardなど）が表示される */}
        </main>
    </>
);

export default AdminLayout;

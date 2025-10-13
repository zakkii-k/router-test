import React from 'react';
import { useAuth } from '../contexts/AuthContext';
// 従業員/管理者に特化したナビゲーションや情報を含める
const AdminHeader: React.FC = () => {
    const {logout} = useAuth();
    return <header style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', borderBottom: '2px solid #ff4500' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>従業員管理システム</h1>
        <button onClick={logout}>ログアウト</button>
        {/* 従業員専用のリンクや設定をここに配置 */}
    </header>
};
export default AdminHeader;

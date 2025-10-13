import React from 'react';

const CustomerDashboard: React.FC = () => {
    return (
        <div style={{ border: '2px solid blue', padding: '20px' }}>
            <h1>顧客ダッシュボード (CUSTOMER専用)</h1>
            <p>このページは顧客権限でのみアクセス可能です。</p>
            <p>もし管理者としてログインした場合、このページにはリダイレクトされません。</p>
        </div>
    );
};
export default CustomerDashboard;

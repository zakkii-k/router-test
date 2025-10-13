import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import type { UserRole } from '../contexts/AuthContext.tsx';

const Header: React.FC = () => {
  const { role, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  // ロールを切り替えてログインをシミュレーション
  const handleLogin = (selectedRole: UserRole) => {
    // 💡 実際は Spring API にユーザー名とパスワードを送信し、成功後にロールを設定する
    login(selectedRole);
    navigate(selectedRole === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard');
  };

  const handleLogout = async () => {
    // 💡 実際は Spring API にログアウトを要求し、セッションを無効化する
    // await fetch('/api/auth/logout', { method: 'POST' }); 
    logout();
    navigate('/');
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      borderBottom: '1px solid #ccc',
      backgroundColor: '#f8f8f8'
    }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/">ホーム</Link>
        {role === 'ADMIN' && <Link to="/admin/dashboard">管理者D/B</Link>}
        {role === 'CUSTOMER' && <Link to="/customer/dashboard">顧客D/B</Link>}
        {isAuthenticated && <Link to="/settings">共通設定</Link>}
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <span>({role}としてログイン中)</span>
            <button 
              onClick={handleLogout} 
              style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
            >
              ログアウト
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleLogin('ADMIN')} style={{ padding: '5px', cursor: 'pointer' }}>
              管理者ログイン (Test)
            </button>
            <button onClick={() => handleLogin('CUSTOMER')} style={{ marginLeft: '10px', padding: '5px', cursor: 'pointer' }}>
              顧客ログイン (Test)
            </button>
            <Link to="/login" style={{ marginLeft: '10px' }}>ログイン画面</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

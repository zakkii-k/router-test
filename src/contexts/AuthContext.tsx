import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// ロール定義
export type UserRole = 'PUBLIC' | 'CUSTOMER' | 'ADMIN';

interface AuthContextType {
  role: UserRole;
  isAuthenticated: boolean;
  setRole: (newRole: UserRole) => void;
  loading: boolean;
  // ログイン/ログアウトをシミュレーションするためのメソッド
  login: (role: UserRole) => void;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  role: 'PUBLIC',
  isAuthenticated: false,
  setRole: () => {},
  loading: true,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('PUBLIC');
  const [loading, setLoading] = useState(true);

  // 実際はAPIコール後の状態更新に使用
  const login = (newRole: UserRole) => setRole(newRole);
  const logout = () => setRole('PUBLIC');

  // 初回ロード時：Spring APIから現在のセッションのロール情報を確認するシミュレーション
  useEffect(() => {
    const fetchCurrentRole = async () => {
      try {
        // 💡 実際は Spring Security のエンドポイントを叩く
        // SpringがセッションCookieから認証状態を判断し、ロールを返す
        const response = await fetch('/api/auth/current-role'); 

        // --- シミュレーション ---
        // 開発時は未ログインをデフォルトにするか、テスト用のロールを返す
        if (response.ok) {
            // サーバーからロールを取得
            // const { userRole } = await response.json(); 
            // setRole(userRole as UserRole);

            // シミュレーションとして3秒後にADMINでログイン状態にする
            await new Promise(resolve => setTimeout(resolve, 300));
            setRole('ADMIN'); // テスト用ロール
        } else {
            // 401 Unauthorized など：未ログイン状態
            setRole('PUBLIC');
        }
      } catch (error) {
        console.error("Failed to fetch auth state:", error);
        setRole('PUBLIC');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentRole();
  }, []);

  const isAuthenticated = role !== 'PUBLIC';

  return (
    <AuthContext.Provider value={{ role, isAuthenticated, setRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

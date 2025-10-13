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

  // 初回ロード時：セッションチェックのシミュレーション
  useEffect(() => {
    // 💡 修正: Spring APIからのセッション確認処理のシミュレーションです。
    // 手動ログインを優先するため、ここでは強制的なロールの上書きを削除し、
    // 未ログイン状態(PUBLIC)で初期化します。
    const simulateInitialCheck = async () => {
        try {
            // 実際はAPIコール（例: /api/auth/current-role）を行い、セッション状態を確認
            await new Promise(resolve => setTimeout(resolve, 100)); // 短い遅延で初期チェックをシミュレート
            
            // 💡 認証されていないものとして初期化
            setRole('PUBLIC');
        } catch (error) {
            console.error("Failed to fetch auth state:", error);
            setRole('PUBLIC');
        } finally {
            setLoading(false);
        }
    };

    simulateInitialCheck();
  }, []);

  const isAuthenticated = role !== 'PUBLIC';

  return (
    <AuthContext.Provider value={{ role, isAuthenticated, setRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

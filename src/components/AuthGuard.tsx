import React, { useLayoutEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import type { UserRole } from '../contexts/AuthContext.tsx';

// ロールごとのリダイレクト先マップ
const REDIRECT_MAP: Record<UserRole, string> = {
  PUBLIC: '/login',             // 未ログイン時のリダイレクト先 (ログインページへ)
  CUSTOMER: '/customer/dashboard', // 権限不足時のリダイレクト先 (顧客ダッシュボードへ)
  ADMIN: '/admin/dashboard',       // 権限不足時のリダイレクト先 (管理者ダッシュボードへ)
};

interface AuthGuardProps {
  children: ReactNode;
  // アクセスを許可するロール。未指定の場合は認証済みであれば誰でもOK。
  allowedRoles?: UserRole[]; 
  // 認証済みユーザーはアクセス不可（例: ログインページ、登録ページ）
  isPublicOnly?: boolean; 
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles, isPublicOnly = false }) => {
  const { role, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  // useLayoutEffectでDOM更新前にリダイレクトを処理し、フリッカリングを防ぐ
  useLayoutEffect(() => {
    // ロール情報取得中は判定をスキップ
    if (loading) {
      return; 
    }

    let hasAccess = false;
    let redirectPath = null;
    const targetPath = window.location.pathname; // どのパスにアクセスしようとしているか

    if (isPublicOnly) {
      // ケース 1: 公開限定ページ (ログインページなど)
      if (isAuthenticated) {
        redirectPath = REDIRECT_MAP[role]; 
        console.warn(`[AuthGuard] ${role}ユーザーは公開限定ページ(${targetPath})にアクセス不可 -> ${redirectPath}へリダイレクト`); // ログ追加
      } else {
        hasAccess = true; 
      }
    } else {
      // ケース 2: 制限付きページ
      if (!isAuthenticated) {
        redirectPath = REDIRECT_MAP['PUBLIC'];
        console.warn(`[AuthGuard] 未ログインユーザーは制限付きページ(${targetPath})にアクセス不可 -> ${redirectPath}へリダイレクト`); // ログ追加
      } else if (allowedRoles && allowedRoles.length > 0) {
        // ロールチェック
        if (allowedRoles.includes(role)) {
          hasAccess = true; // 権限あり
        } else {
          redirectPath = REDIRECT_MAP[role]; 
          console.error(`[AuthGuard] ${role}ユーザーは権限不足(${targetPath}) -> ${redirectPath}へリダイレクト`); // ログ追加
        }
      } else {
        // allowedRolesがない = 認証済みなら誰でもOK
        hasAccess = true;
      }
    }

    if (redirectPath) {
      // リダイレクト実行
      navigate(redirectPath, { replace: true });
    } else {
      setIsAccessGranted(hasAccess);
    }

  }, [role, isAuthenticated, allowedRoles, isPublicOnly, navigate, loading]);

  // ロール情報取得中、またはアクセス権がない場合はローディング表示
  if (loading || !isAccessGranted) {
    // 画面の一瞬の表示を防ぐためのローディングメッセージ
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        セッションと権限を確認中です...
      </div>
    ); 
  }

  return <>{children}</>;
};

export default AuthGuard;

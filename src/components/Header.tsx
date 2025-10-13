import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 外部コンポーネント・型
import { useAuth } from '../contexts/AuthContext.tsx';
import { useSearch } from '../contexts/SearchContext.tsx'; // 検索状態をメインコンテンツと共有
import type { UserRole } from '../contexts/AuthContext.tsx';
import logoImage from '../assets/logo.png';
import Dropdown from './Dropdown.tsx';
import SearchInput from './SearchInput.tsx';
import SearchButton from './SearchButton.tsx';
// 💡 .tsx や .ts の拡張子を明示的に指定しないと、ビルド時にエラーになる場合があります
import type { DropdownItem } from '../types/Shared.ts'; 


const useClickOutside = (ref: React.RefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // refが存在し、かつクリックされた場所がref要素の内部ではない場合
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

// アイコン用のダミーSVGコンポーネント
const Icon: React.FC<{ label: string, emoji: string, onClick?: () => void }> = ({ label, emoji, onClick }) => (
  <button 
      title={label}
      onClick={onClick}
      style={{ 
          width: '35px', 
          height: '35px', 
          borderRadius: '50%', 
          border: '1px solid #ddd', 
          backgroundColor: '#fff', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontSize: '18px',
          cursor: 'pointer'
      }}
  >
      {emoji}
  </button>
);

// プロフィールメニュー (ドロップオーバー) コンポーネント
interface ProfileMenuProps {
  role: UserRole;
  onLogout: () => void;
  // 外部からのRefを受け取る
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ role, onLogout, menuRef }) => {
  const userName = `${role} ユーザー`;

  const menuStyles: React.CSSProperties = {
      position: 'absolute',
      top: '45px', 
      right: '0',
      width: '180px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 200, 
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'column',
  };

  const linkStyles: React.CSSProperties = {
      padding: '8px 15px',
      textDecoration: 'none',
      color: '#333',
      cursor: 'pointer',
  };

  return (
      <div ref={menuRef} style={menuStyles}>
          <div style={{ padding: '8px 15px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
              {userName}
          </div>
          <Link to={role === 'ADMIN' ? '/admin/profile' : '/customer/profile'} style={linkStyles}>会員情報変更</Link>
          <button onClick={onLogout} style={{ ...linkStyles, textAlign: 'left', border: 'none', background: 'none' }}>
              ログアウト
          </button>
      </div>
  );
};

const Header: React.FC = () => {
  const { role, isAuthenticated, login, logout } = useAuth();
  // useSearchがContext内にあることを前提とします
  const { setSearchParams } = useSearch(); 
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // 💡 Refの定義: メニュー全体（アイコンとドロップダウン）のコンテナ
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // useClickOutsideを使って、メニュー外クリックでメニューを閉じる
  // 依存配列に setIsMenuOpen を含める必要はないが、useCallbackでラップされていないためReactの推奨に従い含める
  useClickOutside(menuContainerRef, () => {
      if (isMenuOpen) {
          setIsMenuOpen(false);
      }
  });
  
  // --- 検索状態の管理 ---
  const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);

  // --- 1. ユーザー認証関連のロジック（既存） ---
  const handleLogin = (selectedRole: UserRole) => {
    login(selectedRole);
    navigate(selectedRole === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- 2. カテゴリ一覧のサーバーからの取得 ---
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockCategories: Array<{ id: number, name: string }> = [
        { id: 1, name: '電子機器' },
        { id: 2, name: '書籍' },
        { id: 3, name: '食品' },
        { id: 4, name: '衣類' },
      ];
      
      const items: DropdownItem[] = [
          { id: null, name: "すべて" },
          ...mockCategories.map(c => ({ id: c.id, name: c.name }))
      ];
      
      setCategoryItems(items);
      setLoadingCategories(false);
    };

    fetchCategories();
  }, []);

  // --- 3. 検索実行ロジック ---
  const handleSearch = useCallback(() => {
    const categoryParam = selectedCategoryId === null 
        ? '' 
        : selectedCategoryId.toString();

    setSearchParams({
        categoryId: categoryParam,
        keyword: keyword.trim(),
    });
    
    console.log("検索実行:", {
        categoryId: categoryParam,
        keyword: keyword.trim()
    });
    
    // 必要に応じて検索結果ページへ遷移
    navigate('/search'); 
    
  }, [selectedCategoryId, keyword, setSearchParams]);


  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      borderBottom: '1px solid #ccc',
      backgroundColor: '#f8f8f8' ,
      width: '100%',
      height: '60px', // 高さを固定して安定させる
      boxSizing: 'border-box', // paddingを含めて高さを計算
      // 上端に固定したい場合は以下を追加
      // position: 'sticky', 
      // top: 0, 
      // zIndex: 100 
    }}>
      {/* =================================================== */}
      {/* 左側: ロゴとナビゲーション (固定幅ではない) */}
      {/* =================================================== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            {/* 💡 本来はロゴ画像を使用:  */}
            <img src={logoImage} alt="logo" style={{ height: '40px', width: 'auto', maxHeight: '100%' }} /> 
           
            {/* <h1>MyShop</h1> */}
        </Link>
        <div style={{ display: 'flex', gap: '15px' }}>
            {role === 'ADMIN' && <Link to="/admin/dashboard" style={{ color: '#333', textDecoration: 'none' }}>管理者D/B</Link>}
            {role === 'CUSTOMER' && <Link to="/customer/dashboard" style={{ color: '#333', textDecoration: 'none' }}>顧客D/B</Link>}
            {isAuthenticated && <Link to="/settings" style={{ color: '#333', textDecoration: 'none' }}>共通設定</Link>}
        </div>
      </div>

      {/* =================================================== */}
      {/* 右側: 検索機能 + ユーザーアクション (全体をflexでまとめる) */}
      {/* =================================================== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* 検索グループ (ドロップダウン, テキスト, ボタン) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {loadingCategories ? (
                <div style={{ padding: '8px' }}>カテゴリ読込中...</div>
            ) : (
                <Dropdown 
                    items={categoryItems}
                    selectedValue={selectedCategoryId}
                    onChange={setSelectedCategoryId}
                />
            )}
            <SearchInput 
                value={keyword} 
                onChange={setKeyword} 
            />
            <SearchButton onClick={handleSearch}>検索</SearchButton>
        </div>

        {/* ユーザーアクション（ログイン状態によって中身が変わるが、幅は固定） */}
        <div 
            style={{ 
                // 💡 この幅を固定することで、中身が変わっても検索バーの位置は動きません
                minWidth: '160px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: isAuthenticated ? 'flex-end' : 'center', 
                gap: '10px' 
            }}
        >
            {isAuthenticated ? (
                // マイページアイコンのドロップオーバーのために position: relative を設定
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    
                    <Icon 
                        label="マイページ" 
                        emoji="👤" 
                        onClick={() => setIsMenuOpen(prev => !prev)} // クリックでメニュー開閉
                    />
                    
                    <Icon label="ほしい物リスト" emoji="❤️" />
                    <Icon label="カート" emoji="🛒" />

                    {/* メニューが表示されている場合 */}
                    {isMenuOpen && (
                        <ProfileMenu role={role} onLogout={handleLogout} menuRef={menuContainerRef} />
                    )}
                </div>
            ) : (
                <>
                    {/* 未ログイン: ログインボタンを中央寄せ */}
                    <button onClick={() => handleLogin('CUSTOMER')} style={{ 
                        padding: '8px 15px', 
                        cursor: 'pointer', 
                        border: '1px solid #007bff', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        borderRadius: '4px' 
                    }}>
                        ログイン (Test)
                    </button>
                </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;

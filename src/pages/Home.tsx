import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import HeartButtonSVG from '../components/HeartButtonSVG.tsx';
import ShoppingCartIcon from '../components/ShoppingCartIcon.tsx';

const Home: React.FC = () => {
    const { role } = useAuth();
    const [cartItems, setCartItems] = useState(3); // カート内の初期個数

    const handleCartClick = () => {
        alert(`カートアイコンがクリックされました。現在${cartItems}個の商品があります。`);
        // 例えば、カートページへ遷移するなどの処理
    };

    const handleAddItem = () => {
        setCartItems(prev => prev + 1);
    };

    const handleRemoveItem = () => {
        setCartItems(prev => Math.max(0, prev - 1));
    };
    return (
        <div>
            <HeartButtonSVG />
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1>ショッピングカート</h1>
            <ShoppingCartIcon itemCount={cartItems} onClick={handleCartClick} />
            <button onClick={handleAddItem}>商品を追加</button>
            <button onClick={handleRemoveItem}>商品を削除</button>
            </div>
            <h1>公開ホーム</h1>
            <p>このページは誰でもアクセス可能です。</p>
            <p>現在のロール: {role}</p>
        </div>
    );
};
export default Home;

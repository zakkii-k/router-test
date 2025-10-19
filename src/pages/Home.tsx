import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import HeartButtonSVG from '../components/HeartButtonSVG.tsx';
import ShoppingCartIcon from '../components/ShoppingCartIcon.tsx';
import CartProductItem from '../components/CartProductItem';
import WishlistProductItem from '../components/WishlistProductItem.tsx';
import { mockCartItems, mockWishlistItems } from '../mockData';

const Home: React.FC = () => {
    const { role } = useAuth();
    const [cartItemsCount, setCartItemsCount] = useState(3); // カート内の初期個数

    const handleCartClick = () => {
        alert(`カートアイコンがクリックされました。現在${cartItemsCount}個の商品があります。`);
        // 例えば、カートページへ遷移するなどの処理
    };

    const handleAddItem = () => {
        setCartItemsCount(prev => prev + 1);
    };

    const handleRemoveItem = () => {
        setCartItemsCount(prev => Math.max(0, prev - 1));
    };

    const [cartItems, setCartItems] = useState(mockCartItems);
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  // カートから商品を削除するハンドラ
  const handleRemoveFromCart = (productId: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  // 「後で買う」を押された商品をカートから削除するハンドラ
  // (実際にはほしい物リストに追加するロジックもここに入る)
  const handleSaveForLater = (productId: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.product.id !== productId));
    // ここで、wishlistItemsに商品を追加するロジックを実装することも可能
    console.log(`${productId} を「後で買う」リストに移動しました`);
  };
    return (
        <div>
            <h1>ほしい物リスト</h1>
      {wishlistItems.map(item => (
        <WishlistProductItem key={item.product.id} item={item} />
      ))}
      
      <hr style={{ margin: '40px 0' }} />

      <h1>カート</h1>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <CartProductItem 
            key={item.product.id} 
            item={item} 
            onRemove={handleRemoveFromCart}
            onSaveForLater={handleSaveForLater}
          />
        ))
      ) : (
        <p>カートに商品がありません。</p>
      )}
            <HeartButtonSVG />
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1>ショッピングカート</h1>
            <ShoppingCartIcon itemCount={cartItemsCount} onClick={handleCartClick} />
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

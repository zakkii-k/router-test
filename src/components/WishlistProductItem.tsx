import React, { useState } from 'react';
import ProductItemBase from './ProductItemBase';
import type { MockWishlistItem } from '../mockData'; // モックデータの型をインポート

// ハートアイコンの仮コンポーネント
const HeartIcon = ({ isFavorited }: { isFavorited: boolean }) => (
  <span style={{ color: isFavorited ? 'red' : 'grey', fontSize: '24px', cursor: 'pointer' }}>
    ❤
  </span>
);

interface WishlistProductItemProps {
  item: MockWishlistItem;
}

const WishlistProductItem: React.FC<WishlistProductItemProps> = ({ item }) => {
  const { product, isFavorited: initialIsFavorited } = item;
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  // API通信をなくし、単純なState更新に
  const handleToggleFavorite = () => {
    setIsFavorited(prevState => !prevState);
    console.log(`商品ID: ${product.id} のお気に入り状態を ${!isFavorited} に変更しました（ローカル）`);
  };
  
  const handleAddToCart = () => {
    console.log(`商品ID: ${product.id} をカートに追加しました`);
  }

  // 右側のボタン群
  const actionButtons = (
    <>
      <button onClick={handleAddToCart}>カートに入れる</button>
      <div onClick={handleToggleFavorite}>
        <HeartIcon isFavorited={isFavorited} />
      </div>
    </>
  );

  return (
    <ProductItemBase
      product={product}
      actionArea={actionButtons}
    />
  );
};

export default WishlistProductItem;
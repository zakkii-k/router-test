import React, { useState } from 'react';
import ProductItemBase from './ProductItemBase';
import type { MockCartItem } from '../mockData'; // モックデータの型をインポート

interface CartProductItemProps {
  item: MockCartItem;
  // 親コンポーネントにイベントを通知するための関数
  onRemove: (productId: string) => void;
  onSaveForLater: (productId: string) => void;
}

const CartProductItem: React.FC<CartProductItemProps> = ({ item, onRemove, onSaveForLater }) => {
  const { product, quantity: initialQuantity } = item;
  
  const [quantity, setQuantity] = useState(initialQuantity);
  const [errorMessage, setErrorMessage] = useState('');

  // API通信の代わりに、モックデータ内の在庫数(stock)でチェック
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;

    if (newQuantity > product.stock) {
      setErrorMessage(`${product.stock}個以上は選択できません`);
    } else {
      setErrorMessage('');
      setQuantity(newQuantity);
    }
  };

  const handleSaveForLaterClick = () => {
    console.log(`「後で買う」がクリックされました: ${product.id}`);
    onSaveForLater(product.id);
  }

  const handleRemoveClick = () => {
    console.log(`「削除」がクリックされました: ${product.id}`);
    onRemove(product.id);
  }

  // 個数変更フォーム
  const quantitySelector = (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>個数: </span>
        <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
        <input 
          type="number" 
          value={quantity} 
          readOnly 
          style={{ width: '40px', textAlign: 'center' }}
        />
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>
      {errorMessage && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</p>}
    </div>
  );

  // 右側のボタン群
  const actionButtons = (
    <>
      <button onClick={handleSaveForLaterClick}>後で買う</button>
      <button onClick={handleRemoveClick}>削除</button>
    </>
  );

  return (
    <ProductItemBase
      product={product}
      quantityArea={quantitySelector}
      actionArea={actionButtons}
    />
  );
};

export default CartProductItem;
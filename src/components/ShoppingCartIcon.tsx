import React from 'react';
import '../styles/ShoppingCartIcon.css'; // 後で作成するCSSファイルをインポート

interface ShoppingCartIconProps {
  itemCount: number; // カート内の商品の個数
  onClick?: () => void; // クリック時のハンドラ（オプション）
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({ itemCount, onClick }) => {
  return (
    <button className="cart-icon-button" onClick={onClick} aria-label={`カートに${itemCount}個の商品があります`}>
      <div className="cart-icon-container">
        {/* Feather IconsのショッピングカートSVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor" // CSSで色を制御する場合、'currentColor'が便利
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-shopping-cart"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>

        {/* カート内個数バッジ */}
        {itemCount > 0 && ( // 個数が0より大きい場合のみ表示
          <span className="cart-item-count">
            {itemCount > 99 ? '99+' : itemCount} {/* 99個以上は'99+'と表示 */}
          </span>
        )}
      </div>
    </button>
  );
};

export default ShoppingCartIcon;
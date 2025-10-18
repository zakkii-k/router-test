import React from 'react';
import '../styles/ShoppingCartIcon.css';

interface ShoppingCartIconProps {
  itemCount: number;
  onClick?: () => void;
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({ itemCount, onClick }) => {
  // 表示するテキストと桁数を決定する
  const displayCount = itemCount > 99 ? '99+' : itemCount.toString();
  const digitClass = itemCount > 9 ? 'double-digits' : 'single-digit';

  return (
    <button className="cart-icon-button" onClick={onClick}>
      <div className="cart-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>

        {itemCount > 0 && (
          // 桁数に応じたクラスを付与
          <span className={`cart-item-count ${digitClass}`}>
            {displayCount}
          </span>
        )}
      </div>
    </button>
  );
};

export default ShoppingCartIcon;
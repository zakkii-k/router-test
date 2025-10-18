import React, { useState } from 'react';

// アイコンのスタイルを定義
const iconStyle = {
  width: '24px',
  height: '24px',
  transition: 'fill 0.2s ease-in-out',
};

// ボタンのスタイル
const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

const HeartButtonSVG = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button
      onClick={toggleFavorite}
      style={buttonStyle}
      aria-pressed={isFavorited}
      aria-label="お気に入りに追加"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={iconStyle}
        // isFavoritedの状態に応じてfillとstrokeの色を切り替える
        fill={isFavorited ? '#ef4444' : 'none'}
        stroke={isFavorited ? '#ef4444' : '#9ca3af'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};

export default HeartButtonSVG;
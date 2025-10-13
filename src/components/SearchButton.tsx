// src/components/SearchButton.tsx

import React from 'react';

interface SearchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{ 
        padding: '8px 15px', 
        borderRadius: '4px', 
        border: '1px solid #007bff', 
        backgroundColor: '#007bff', 
        color: 'white', 
        cursor: 'pointer' 
      }}
    >
      {children}
    </button>
  );
};

export default SearchButton;
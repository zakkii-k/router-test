// src/components/Dropdown.tsx (CategoryDropdown.tsxから改名)

import React from 'react';
import type { DropdownItem } from '../types/Shared'; // 修正した型をインポート

interface DropdownProps {
  // すでに「すべて」のデータを含む配列を受け取る
  items: DropdownItem[]; 
  selectedValue: number | null; // 選択値も number | null に統一
  onChange: (value: number | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, selectedValue, onChange }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    // 'null'文字列をJavaScriptのnull値に変換し、それ以外は数値に変換
    const newValue: number | null = value === 'null' ? null : parseInt(value, 10);
    onChange(newValue);
  };

  return (
    <select 
      // selectのvalueは文字列しか受け付けないため、nullを'null'文字列に変換して渡す
      value={selectedValue === null ? 'null' : selectedValue.toString()} 
      onChange={handleChange}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    >
      {items.map((item) => (
        <option 
          key={item.id === null ? 'all' : item.id} 
          // nullを'null'文字列に変換してoptionのvalueに設定
          value={item.id === null ? 'null' : item.id.toString()}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
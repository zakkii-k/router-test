// src/types/Shared.ts (または CategoryDropdown.tsx)

// Category型を、汎用的なDropdownItem型に変更することを推奨
export interface DropdownItem {
    // 'null'は「すべて」または「未選択」を示すために使用
    id: number | null; 
    name: string;
  }
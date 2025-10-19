import type { CartItem, WishlistItem } from './types/types.ts';

// 在庫数の情報を追加
interface ProductWithStock {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
  size: string;
  price: number;
  stock: number; // 在庫数
}

// WishlistItemの型定義も更新
export interface MockWishlistItem extends Omit<WishlistItem, 'product'> {
  product: ProductWithStock;
}

export interface MockCartItem extends Omit<CartItem, 'product'> {
  product: ProductWithStock;
}


// サンプルデータ
export const mockWishlistItems: MockWishlistItem[] = [
  {
    product: {
      id: 'p001',
      name: '高機能ランニングシューズ',
      imageUrl: 'https://via.placeholder.com/100',
      color: 'ブラック',
      size: '27.0cm',
      price: 12000,
      stock: 10,
    },
    isFavorited: true,
  },
];

export const mockCartItems: MockCartItem[] = [
  {
    product: {
      id: 'p002',
      name: 'オーガニックコットンTシャツ',
      imageUrl: 'https://via.placeholder.com/100',
      color: 'ホワイト',
      size: 'M',
      price: 3500,
      stock: 5, // この商品の在庫は5個
    },
    quantity: 1,
  },
  {
    product: {
      id: 'p003',
      name: 'スリムフィットジーンズ',
      imageUrl: 'https://via.placeholder.com/100',
      color: 'インディゴ',
      size: '32インチ',
      price: 8900,
      stock: 3, // この商品の在庫は3個
    },
    quantity: 2,
  },
];
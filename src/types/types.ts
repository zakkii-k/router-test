// src/types.ts

/** 商品自体の情報 */
export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    color: string;
    size: string;
    price: number;
  }
  
  /** カート内の商品情報（商品情報 + 個数） */
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  /** ほしい物リスト内の商品情報 */
  export interface WishlistItem {
    product: Product;
    // サーバー側で管理されている「お気に入り状態」を初期表示用に受け取る
    isFavorited: boolean; 
  }
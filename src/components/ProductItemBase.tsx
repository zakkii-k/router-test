// src/components/ProductItemBase.tsx

import React from 'react';
import type { Product } from '../types/types.ts'; // 共通の型をインポート

interface ProductItemBaseProps {
  product: Product;
  quantityArea?: React.ReactNode;
  actionArea?: React.ReactNode;
}

// 実装は前回提示したものと同じ
const ProductItemBase: React.FC<ProductItemBaseProps> = ({
  product,
  quantityArea,
  actionArea,
}) => {
  return (
    <div style={{ display: 'flex', border: '1px solid #ccc', padding: '16px', marginBottom: '8px' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px', marginRight: '16px' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p><strong>{product.name}</strong></p>
        <p>カラー: {product.color}</p>
        <p>サイズ: {product.size}</p>
        <p>金額: &yen;{product.price.toLocaleString()}</p>
        {quantityArea}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
        {actionArea}
      </div>
    </div>
  );
};

export default ProductItemBase;
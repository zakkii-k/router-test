import React, { useEffect, useState } from 'react';
import { useSearch } from '../contexts/SearchContext.tsx';

// 検索結果データの型を定義
interface Product {
    id: number;
    name: string;
    price: number;
    categoryName: string;
}

const SearchResultPage: React.FC = () => {
    // 1. Contextから検索パラメータを取得
    const { searchParams } = useSearch();

    // 2. 検索結果の状態を管理
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 3. パラメータの変更を監視し、APIフェッチを実行
    useEffect(() => {
        // パラメータが空の場合はフェッチをスキップ（初期状態など）
        // 検索クエリが空でないか、または意図的に全件検索を許可する場合に実行する
        const { categoryId, keyword } = searchParams;
        if (!categoryId && !keyword) {
             // 検索パラメータが未設定の場合は、結果を空にして終了
             setResults([]);
             return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            // クエリパラメータを組み立て (Header.tsxと同じロジックを再現)
            const query = new URLSearchParams();
            if (categoryId) {
                query.append('categoryId', categoryId);
            }
            if (keyword) {
                query.append('keyword', keyword);
            }
            const queryString = query.toString();

            console.log(`[SearchResult] APIフェッチ開始: /api/search?${queryString}`);

            try {
                // 💡 実際は Spring API を叩く
                // const response = await fetch(`/api/search?${queryString}`);
                
                // --- 検索結果のシミュレーション ---
                await new Promise(resolve => setTimeout(resolve, 800)); // API遅延シミュレーション
                
                const mockResults: Product[] = generateMockResults(categoryId, keyword);

                // if (response.ok) {
                //     const data = await response.json();
                setResults(mockResults);
                // } else {
                //     throw new Error(`APIエラー: ${response.status}`);
                // }

            } catch (err) {
                console.error("検索エラー:", err);
                setError("検索結果の取得中にエラーが発生しました。");
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]); // 💡 searchParamsが変更されるたびに再実行される

    
    // --- ダミーデータ生成関数 ---
    const generateMockResults = (categoryId: string, keyword: string): Product[] => {
        const results = [
            { id: 101, name: '高性能ノートPC', price: 150000, categoryName: '電子機器' },
            { id: 102, name: 'ワイヤレスイヤホン', price: 15000, categoryName: '電子機器' },
            { id: 201, name: 'React入門書', price: 3000, categoryName: '書籍' },
            { id: 301, name: 'オーガニックコーヒー豆', price: 2500, categoryName: '食品' },
            { id: 401, name: '夏用Tシャツ', price: 5000, categoryName: '衣類' },
        ];

        return results.filter(p => {
            const categoryMatch = !categoryId || p.categoryName === results.find(r => r.id === parseInt(categoryId))?.categoryName || categoryId.split(',').includes(p.id.toString());
            const keywordMatch = !keyword || p.name.includes(keyword);
            return categoryMatch && keywordMatch;
        });
    };
    // ----------------------------


    const title = `検索結果: カテゴリID="${searchParams.categoryId || 'すべて'}", キーワード="${searchParams.keyword}"`;
    
    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>検索中... </div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h1>{title}</h1>
            
            {error && <p style={{ color: 'red' }}>エラー: {error}</p>}

            {results.length === 0 && !loading ? (
                <p>該当する商品が見つかりませんでした。</p>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    <h2>商品リスト ({results.length}件)</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {results.map((product) => (
                            <li key={product.id} style={{ 
                                borderBottom: '1px dotted #eee', 
                                padding: '10px 0', 
                                display: 'flex', 
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <strong>{product.name}</strong> 
                                    <span style={{ marginLeft: '10px', color: '#666' }}>({product.categoryName})</span>
                                </div>
                                <span>¥{product.price.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchResultPage;
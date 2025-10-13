import React, { useEffect, useState } from 'react';

interface UserDetails {
    username: string;
    email: string;
}

const AdminDashboard: React.FC = () => {
    const [details, setDetails] = useState<UserDetails | null>(null);

    // 💡 このコンポーネントがロードされた時点で、AuthGuardによりADMIN権限があることは保証されている
    useEffect(() => {
        // ユーザーの詳細情報を取得するAPIコール
        const fetchUserDetails = async () => {
            try {
                // Spring API (セッションCookieでユーザーを識別)
                const response = await fetch('/api/user/details');
                
                // --- シミュレーション ---
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (response.ok) {
                    const data: UserDetails = { 
                        username: "山田 太郎 (管理者)", 
                        email: "admin@example.com" 
                    };
                    setDetails(data);
                } else {
                    // APIエラーやセッション切れの場合の処理（通常はAuthGuardが先にリダイレクトするはず）
                    console.error("ユーザー情報の取得に失敗");
                }
            } catch (error) {
                console.error("API通信エラー", error);
            }
        };

        fetchUserDetails();
    }, []);

    if (!details) {
        return <div>管理者情報をロード中...</div>;
    }

    return (
        <div style={{ border: '2px solid red', padding: '20px' }}>
            <h1>管理者ダッシュボード (ADMIN専用)</h1>
            <p>ようこそ、{details.username}さん！</p>
            <p>メールアドレス: {details.email}</p>
            <p>あなたは管理者権限を持っているため、このページにアクセスできます。</p>
        </div>
    );
};

export default AdminDashboard;

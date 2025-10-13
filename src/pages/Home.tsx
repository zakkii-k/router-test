import React from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

const Home: React.FC = () => {
    const { role } = useAuth();
    return (
        <div>
            <h1>公開ホーム</h1>
            <p>このページは誰でもアクセス可能です。</p>
            <p>現在のロール: {role}</p>
        </div>
    );
};
export default Home;

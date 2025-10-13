import React from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

const Login: React.FC = () => {
    const { login } = useAuth();

    return (
        <div>
            <h1>ログイン画面</h1>
            <p>このページは認証ガードにより、ログイン済みのユーザーからはアクセスできません。</p>
            <p>（例として、ボタンでログインをシミュレーションできます）</p>
            <button 
                onClick={() => login('ADMIN')} 
                style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}
            >
                ADMINとしてログイン
            </button>
            <button 
                onClick={() => login('CUSTOMER')} 
                style={{ padding: '10px', cursor: 'pointer' }}
            >
                CUSTOMERとしてログイン
            </button>
        </div>
    );
};
export default Login;

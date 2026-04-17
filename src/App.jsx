import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { ProtectedRoute } from './ProtectedRoute';

import Home from './pages/home/Home';
import Topup from './pages/topup/IndexTopup';
import Payment from './pages/payment/IndexPayment';
import TransactionHistory from './pages/history/IndexTransactionHistory';
import Account from './pages/account/IndexAccount';

import { getSessionData } from './components/Global/Formatter';
import { ConfigProvider } from 'antd';

const App = () => {
    const session = getSessionData();
    // const isadmin = session?.user?.user_id;

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: { fontSize: 16 },
                    Select: { fontSize: 16 },
                    DatePicker: { fontSize: 16 },
                    Table: { fontSize: 16 },
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route path="home" element={<Home />} />
                        <Route path="topup" element={<Topup />} />
                        <Route path="payment" element={<Payment />} />
                        <Route path="transaction/history" element={<TransactionHistory />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;

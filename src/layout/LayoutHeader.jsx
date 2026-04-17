import React, { useState } from 'react';
import { Layout, theme, Typography, Button, Menu, Image } from 'antd';
import logoSims from '../assets/images/ppob/logo-ppob.png'

// import {
//     UserOutlined,
//     LogoutOutlined,
//     MailOutlined,
//     AppstoreOutlined,
//     SettingOutlined
// } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;
const { Header } = Layout;

const LayoutHeader = () => {
    const navigate = useNavigate();

    const {token: { colorBgContainer, colorBorder, colorText }} = theme.useToken();

    // state menu
    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        setCurrent(e.key);

        if (e.key === 'home') navigate('/home');
        if (e.key === 'topup') navigate('/topup');
        if (e.key === 'transaction') navigate('/transaction/history');
        if (e.key === 'account') navigate('/account');
    };

    // items menu
    const items = [
        {
            key: 'home',
            label: <Text style={{fontSize:'18px'}}>Home</Text>,
        },
        {
            key: 'topup',
            label: <Text style={{fontSize:'18px'}}>Top Up</Text>,
        },
        {
            key: 'transaction',
            label: <Text style={{fontSize:'18px'}}>Transaction</Text>,
        },
        {
            key: 'account',
            label: <Text style={{fontSize:'18px'}}>Account</Text>,
        },
    ];

    return (
        <Header
            style={{
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                gap: 20
            }}
        >
            <div style={{width:'13%'}}></div>
            {/* LEFT */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={logoSims}
                    alt="logo"
                    width={30}
                    preview={false}
                    style={{
                        filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))',
                    }}
                />
                <Text style={{ color: '#001529', fontSize: 24, fontWeight: 500, marginLeft:'5px' }}>
                    SIMS PPOB-Bragas Rexita E.
                </Text>
            </div>

            {/* RIGHT (MENU) */}
            <div style={{ marginLeft: 'auto', }}>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    overflowedIndicator={null}
                />
            </div>
            <div style={{width:'12%'}}></div>
        </Header>
    );
};

export default LayoutHeader;
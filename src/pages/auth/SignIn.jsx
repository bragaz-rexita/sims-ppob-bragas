import { Flex, Input, Form, Button, Card, Space, Image, Typography, Row, Col, ConfigProvider } from 'antd';
import React from 'react';
import { login } from '../../api/auth';
import logoSignup from '../../assets/images/ppob/logo-signup.png';
import logoSims from '../../assets/images/ppob/logo-ppob.png'
import { useNavigate } from 'react-router-dom';
import { NotifAlert, NotifProgress } from '../../components/Global/ToastNotif';
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { encryptData } from '../../components/Global/Formatter';
import LayoutImages from './component/RightImage';

const { Text, Link } = Typography;

const SignIn = () => {
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const handleOnSubmit = async (values) => {
        try {
            const payload = {
                email: values.email,
                password: values.password,
            }

            const response = await login(payload);
            if (response) {
                NotifProgress({
                    title: 'Waiting...',
                    timer: 2000
                });

                const token = response.data.data.token;
                localStorage.setItem('token', token);

                const dataSession = {
                    ...response.data.data,
                    auth: true,
                };

                localStorage.setItem('session', encryptData(dataSession));

                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                NotifAlert({
                    icon: 'error',
                    title: 'Gagal',
                    message: response?.data?.message || 'Terjadi kesalahan saat Login.',
                });
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            NotifAlert({
                icon: 'error',
                title: 'Error',
                message: `Gagal memuat data ${error}`,
            });
        }
    };

    const moveToRegistration = (e) => {
        navigate("/signup")
    };

    return (
        <Flex
            style={{
                minHeight: '100vh',
            }}
        >
            <Flex
                flex={1}
                align="center"
                justify="center"
                style={{ backgroundColor: 'white' }}
            >
                <Card
                    style={{
                        width: '100%',
                        maxWidth: 450,
                        borderRadius: '12px',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        textAlign: 'center',
                    }}
                >
                    <Row>
                        <Col span={24}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                                <Image src={logoSims} width={30} preview={false} />
                                <Text style={{ fontSize: 24, fontWeight: 500 }}>
                                    SIMS PPOB
                                </Text>
                            </div>
                        </Col>
                    </Row>

                    <h1 style={{ marginBottom: 20 }}>
                        Masuk atau buat akun untuk memulai
                    </h1>

                    <Form
                        onFinish={handleOnSubmit}
                        layout="vertical"
                        initialValues={{
                            email: 'user@nutech-integrasi.com',
                            password: 'abcdef1234'
                        }}
                    >
                        <Form.Item
                            label={<Text style={{fontSize: '17px'}}>Email</Text>}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: <Text style={{fontSize: '14px', color: 'red'}}>Please input your Email!</Text>
                                },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Email" size="large"
                                autoFocus
                            />
                        </Form.Item>
                        <Form.Item
                            label={<Text style={{fontSize: '17px'}}>Password</Text>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: <Text style={{fontSize: '14px', color: 'red'}}>Please input your Password!</Text>
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <ConfigProvider
                                    theme={{
                                        token: { colorBgContainer: '#ff3a3a' },
                                        components: {
                                            Button: {
                                                defaultBg: '#ff3a3a',
                                                defaultColor: '#FFFFFF',
                                                defaultBorderColor: '#ff3a3a',
                                                defaultHoverColor: '#FFFFFF',
                                                defaultHoverBorderColor: '#b12626',
                                                defaultHoverBg: '#b12626',
                                            },
                                        },
                                    }}
                                >
                                    <Button style={{width:'100%'}} htmlType="submit">
                                        Masuk
                                    </Button>
                                </ConfigProvider>
                            </Space>
                        </Form.Item>
                    </Form>
                    <div style={{height: '20px'}}></div>
                    <Text>Belum punya akun ? registrasi </Text>
                    <Link onClick={moveToRegistration} style={{ color: '#ff2222' }}>
                        disini
                    </Link>
                </Card>
            </Flex>
            <LayoutImages/>
        </Flex>
    );
};

export default SignIn;
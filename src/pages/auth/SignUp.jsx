import React, { useState } from 'react';
import { Flex, Input, Form, Button, Card, Space, Image, Typography, Row, Col, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import logoSignup from '../../assets/images/ppob/logo-signup.png';
import logoSims from '../../assets/images/ppob/logo-ppob.png'
import { register } from '../../api/auth';
import { NotifOk, NotifAlert } from '../../components/Global/ToastNotif';

const { Text, Link } = Typography;

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // const [isRegistered, setIsRegistered] = useState(false);

    const moveToSignin = () => {
        navigate('/signin');
    };

    const handleSignUp = async (values) => {
        const { email, first_name, last_name, password, confirmPassword } = values;

        // Validasi confirm password
        if (password !== confirmPassword) {
            NotifAlert({
                icon: 'error',
                title: 'Password Tidak Sama',
                message: 'Password dan confirm password harus sama',
            });
            form.resetFields(['password', 'confirmPassword']);
            return;
        }

        // Validasi password kompleks
        const passwordErrors = [];
        if (password.length < 8) passwordErrors.push('Minimal 8 karakter');
        // if (!/[A-Z]/.test(password)) passwordErrors.push('Harus ada huruf kapital');
        // if (!/[0-9]/.test(password)) passwordErrors.push('Harus ada angka');
        // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        //     passwordErrors.push('Harus ada karakter spesial');
        if (passwordErrors.length) {
            NotifAlert({
                icon: 'error',
                title: 'Password Tidak Valid',
                message: passwordErrors.join(', '),
            });
            form.resetFields(['password', 'confirmPassword']);
            return;
        }

        setLoading(true);
        try {
            const res = await register({
                email,
                first_name,
                last_name,
                password,
            });

            NotifOk({
                icon: 'success',
                title: 'Registrasi Berhasil',
                message: res?.data?.message || 'Berhasil menambahkan user.',
            });

            form.resetFields();
        } catch (err) {
            console.error('Register error:', err);
            const errorMessage = err?.response?.data?.message || err.message || 'Terjadi kesalahan';

            NotifAlert({
                icon: 'error',
                title: 'Registrasi Gagal',
                message: errorMessage || 'Terjadi kesalahan',
            });
            if (errorMessage.toLowerCase().includes('already')) {
                form.resetFields();
            }
        } finally {
            setLoading(false);
        }
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
                        Lengkapi data untuk membuat akun
                    </h1>

                    <Form form={form} onFinish={handleSignUp} layout="vertical">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input size="large" placeholder='Masukkan email anda' />
                        </Form.Item>

                        <Form.Item label="Nama Depan" name="first_name" rules={[{ required: true }]}>
                            <Input size="large" placeholder='Nama Depan'/>
                        </Form.Item>

                        <Form.Item label="Nama Belakang" name="last_name" rules={[{ required: true }]}>
                            <Input size="large" placeholder='Nama Belakang'/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password size="large" placeholder='Password'/>
                        </Form.Item>

                        <Form.Item
                            label="Konfirmasi Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Password tidak sama'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="large" placeholder='Konfirmasi Password'/>
                        </Form.Item>
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
                            <Button style={{width:'100%'}} loading={loading} htmlType="submit">
                                Registrasi
                            </Button>
                        </ConfigProvider>
                    </Form>
                    <div style={{height: '20px'}}></div>
                    <Text>Sudah punya akun ? login </Text>
                    <Link onClick={moveToSignin} style={{ color: '#ff2222' }}>
                        disini
                    </Link>
                </Card>
            </Flex>
            <Flex
                flex={1}
                align="center"
                justify="center"
                style={{ backgroundColor: '#f5f5f5' }}
            >
                <Image
                    src={logoSignup}
                    preview={false}
                    style={{
                        maxWidth: '89%',
                        height: 'auto',
                    }}
                />
            </Flex>
        </Flex>
    );
};

export default SignUp;
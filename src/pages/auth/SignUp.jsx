import React, { useState } from 'react';
import {
    Flex,
    Input,
    Form,
    Button,
    Card,
    Image,
    Typography,
    Row,
    Col,
    ConfigProvider,
    Grid
} from 'antd';
import { useNavigate } from 'react-router-dom';
import logoSims from '../../assets/images/ppob/logo-ppob.png';
import { register } from '../../api/auth';
import { NotifOk, NotifAlert } from '../../components/Global/ToastNotif';
import LayoutImages from './component/RightImage';
import TitleWeb from './component/TitleWeb';

const { Text, Link } = Typography;
const { useBreakpoint } = Grid;

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const moveToSignin = () => {
        navigate('/signin');
    };

    const handleSignUp = async (values) => {
        const { email, first_name, last_name, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            NotifAlert({
                icon: 'error',
                title: 'Password Tidak Sama',
                message: 'Password dan confirm password harus sama',
            });
            form.resetFields(['password', 'confirmPassword']);
            return;
        }

        if (password.length < 8) {
            NotifAlert({
                icon: 'error',
                title: 'Password Tidak Valid',
                message: 'Minimal 8 karakter',
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
                confirmButtonText: 'Kembali ke login',
                onOk: ()=> navigate('/signin')
            });

            form.resetFields();
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message || err.message || 'Terjadi kesalahan';

            NotifAlert({
                icon: 'error',
                title: 'Registrasi Gagal',
                message: errorMessage,
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
            vertical={isMobile}
            style={{ minHeight: '100vh' }}
        >
            {isMobile && <LayoutImages />}
            <Flex
                flex={1}
                align="center"
                justify="center"
                style={{
                    backgroundColor: 'white',
                    padding: isMobile ? '20px' : 0
                }}
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
                    <TitleWeb/>

                    <h1 style={{ marginBottom: 20 }}>
                        Lengkapi data untuk membuat akun
                    </h1>

                    <Form form={form} onFinish={handleSignUp} layout="vertical">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input size="large" placeholder="Masukkan email anda" />
                        </Form.Item>

                        <Form.Item
                            label="Nama Depan"
                            name="first_name"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" placeholder="Nama Depan" />
                        </Form.Item>

                        <Form.Item
                            label="Nama Belakang"
                            name="last_name"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" placeholder="Nama Belakang" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password size="large" placeholder="Password" />
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
                            <Input.Password size="large" placeholder="Konfirmasi Password" />
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
                            <Button
                                style={{ width: '100%' }}
                                loading={loading}
                                htmlType="submit"
                            >
                                Registrasi
                            </Button>
                        </ConfigProvider>
                    </Form>

                    <div style={{ height: '20px' }} />

                    <Text>Sudah punya akun? login </Text>
                    <Link onClick={moveToSignin} style={{ color: '#ff2222' }}>
                        disini
                    </Link>
                </Card>
            </Flex>
            {!isMobile && <LayoutImages />}
        </Flex>
    );
};

export default SignUp;
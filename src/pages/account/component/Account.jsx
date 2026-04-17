import { useEffect, useState, useRef } from 'react';
import { Row, Col, Typography, Image, Button, Input, ConfigProvider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDataAccount, updateDataAccount } from '../../../api/api-account';
import { NotifAlert, NotifQuestion } from '../../../components/Global/ToastNotif';
import ProfilePhoto from './ProfilePhoto';

const { Text, Link } = Typography;

const Account = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [displayName, setDisplayName] = useState('');

    const defaultData = {
        email: '',
        first_name: '',
        last_name: '',
        profile_image: ''
    };

    const [formData, setFormData] = useState(defaultData);
    const [onReadOnly, setOnReadOnly] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getProfile();
        }else{
            navigate('/signin');
        }
    }, []);

    const getProfile = async()=>{
        try {
            const response = await getDataAccount();
            setFormData(response.data);
            setDisplayName(response.data.first_name +' '+response.data.last_name);
        } catch (error) {
            console.log(error);
            NotifAlert({
                icon: 'error',
                title: 'Error',
                message: `Gagal memuat data ${error}`,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditProfile = ()=>{
        setOnReadOnly(false);
        inputRef.current.focus();
    };

    const handleSaveProfile = ()=>{
        NotifQuestion({
            icon: 'question',
            title: 'Konfirmasi',
            confirmButtonText: 'Ya, update profile',
            message: `Anda yakin untuk update profile ?`,
            onCancel: ()=>'',
            onConfirm: () => storeData(),
        });
    };

    const storeData = async()=>{
        const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name
        };

        try {
            const response = await updateDataAccount(payload);
            if(response){
                NotifAlert({
                    icon: 'success',
                    title: 'Success',
                    message: 'Update profile berhasil.',
                });
                setOnReadOnly(true);
            }
        } catch (error) {
            console.log(error);
            NotifAlert({
                icon: 'error',
                title: 'Error',
                message: `Gagal memuat data ${error}`,
            });
        }
    };

    const handleLogout = async()=>{
        NotifQuestion({
            icon: 'question',
            title: 'Konfirmasi',
            confirmButtonText: 'Ya, lanjutkan keluar',
            message: `Anda yakin untuk keluar dari aplikasi ?`,
            onCancel: ()=>'',
            onConfirm: () => storeLogout(),
        });
    };

    const storeLogout = async()=>{
        localStorage.removeItem('sidebar_collapsed');
        localStorage.removeItem('session');
        localStorage.removeItem('token');
        navigate('/signin');
    };

    const handleBack = ()=>{
        navigate('/home');
    };

    return (
        <>
            <ProfilePhoto
                urlPhoto={formData.profile_image}
            />
            <Row style={{marginTop:50}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{textAlign:'center'}}>
                    <Text strong style={{fontSize:'30px'}}>{displayName || 'admin'}</Text>
                </Col>
            </Row>
            <div style={{height: '20px'}}></div>
            <div>
                <Text strong>Email</Text>
                <Input
                    name="email"
                    value={formData.email}
                    style={{ color:'#000000' }}
                    disabled
                />
            </div>
            <div style={{height: '20px'}}></div>
            <div>
                <Text strong>Nama Depan</Text>
                <Input
                    ref={inputRef}
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    readOnly={onReadOnly}
                />
            </div>
            <div style={{height: '20px'}}></div>
            <div>
                <Text strong>Nama Belakang</Text>
                <Input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    readOnly={onReadOnly}
                />
            </div>
            <div style={{height: '30px'}}></div>
            {onReadOnly ? (
                <div>
                    <ConfigProvider
                        theme={{
                            token: { colorBgContainer: '#d7d9f7' },
                            components: {
                                Button: {
                                    defaultBg: '#FFFFFF',
                                    defaultColor: '#ff3a3a',
                                    defaultBorderColor: '#ff3a3a',
                                    defaultHoverColor: '#ff3a3a',
                                    defaultHoverBorderColor: '#ff3a3a',
                                    defaultHoverBg: '#fcf2f2',
                                },
                            },
                        }}
                    >
                        <Button style={{width:'100%'}} onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                    </ConfigProvider>
                </div>
            ) : (
                <div>
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
                        <Button style={{width:'100%'}} onClick={handleSaveProfile}>
                            Simpan
                        </Button>
                    </ConfigProvider>
                </div>
            )}
            <div style={{height: '10px'}}></div>
            {onReadOnly && (
                <div>
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
                        <Button style={{width:'100%'}} onClick={handleLogout}>
                            Log Out
                        </Button>
                    </ConfigProvider>
                </div>
            )}
            <div style={{height: '30px'}}></div>
            <Link strong onClick={handleBack} style={{ color: '#ff2222' }}>
                Kembali ke Beranda
            </Link>
        </>
    );
};

export default Account;
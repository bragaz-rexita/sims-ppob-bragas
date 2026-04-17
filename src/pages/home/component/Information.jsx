import { useEffect, useState } from 'react';
import { Row, Col, Typography, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgSaldo from '../../../assets/images/ppob/bg-saldo.png';
import profilePhoto from '../../../assets/images/ppob/profile-photo.png';
import { fetchProfile, fetchBalance } from '../../../stores/slices/profileSlice';
import { formatToDisplayRupiah } from '../../../components/Global/Formatter';
import { NotifAlert } from '../../../components/Global/ToastNotif';

const { Text, Link } = Typography;

const Information = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSaldo, setShowSaldo] = useState(false);

    const { profile, balance, error } = useSelector((state) => state.profile);

    const photoProfile = profile.profile_image === 'https://minio.nutech-integrasi.com/take-home-test/null' ? profilePhoto : profile.profile_image;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchProfile());
            dispatch(fetchBalance());
        } else {
            navigate('/signin');
        }
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            NotifAlert({
                icon: 'error',
                title: 'Error',
                message: `Gagal memuat data ${error}`,
            });
        }
    }, [error]);

    return (
        <Row style={{ marginTop: 50 }} justify={'space-between'}>
            <Col xs={24} md={8}>
                <Row>
                    <Col>
                        <Image
                            src={photoProfile}
                            alt="logo"
                            width={70}
                            preview={false}
                            style={{
                                filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))',
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Text style={{ fontSize: 18 }}>Selamat datang,</Text>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Text style={{ fontSize: '30px', fontWeight: 500 }}>
                            {profile.first_name} {profile.last_name}
                        </Text>
                    </Col>
                </Row>
            </Col>
            <Col xs={24} md={10} style={{ marginTop: 20 }}>
                <div
                    style={{
                        backgroundImage: `url(${bgSaldo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: 10,
                    }}
                >
                    <Row style={{ padding: '20px 0px 0px 20px' }}>
                        <Col>
                            <Text strong style={{ fontSize: 18, color: 'white' }}>
                                Saldo anda
                            </Text>
                        </Col>
                    </Row>

                    <Row style={{ padding: '0px 0px 0px 20px' }}>
                        <Col>
                            <Text strong style={{ fontSize: 30, color: 'white' }}>
                                Rp {showSaldo
                                    ? formatToDisplayRupiah(balance)
                                    : '•••••••••••'}
                            </Text>
                        </Col>
                    </Row>

                    <Row style={{ padding: '0px 20px 15px 20px' }}>
                        <Col>
                            <Link
                                style={{ fontSize: 16, color: 'white' }}
                                onClick={() => setShowSaldo(!showSaldo)}
                            >
                                {showSaldo ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default Information;
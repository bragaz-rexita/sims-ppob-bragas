import { useEffect, useState } from 'react';
import { Row, Col, Typography, Image } from 'antd';
import bgSaldo from '../../../assets/images/ppob/bg-saldo.png';
import profilePhoto from '../../../assets/images/ppob/profile-photo.png';
import { getDataProfile, getDataBalance } from '../../../api/api-home';
import { formatToDisplayRupiah } from '../../../components/Global/Formatter';
import { useSaldoStore } from '../../../stores/saldo-store';
import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;

const Information = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [showSaldo, setShowSaldo] = useState(false);

    const { balance, setBalance, refreshSaldo } = useSaldoStore();

    const photoProfile = profile.profile_image ?? profilePhoto;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getProfile();
            getBalance();
        }else{
            navigate('/signin');
        }
    }, [refreshSaldo]);

    const getProfile = async()=>{
        try {
            const response = await getDataProfile();
            setProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getBalance = async()=>{
        try {
            const response = await getDataBalance();
            setBalance(response.data.balance);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Row style={{marginTop:50}} justify={'space-between'}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
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
                        <Text style={{fontSize:18}}>Selamat datang,</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={{fontSize:'30px', fontWeight:500}}>{profile.last_name}</Text>
                    </Col>
                </Row>
            </Col>
            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                <div
                    style={{
                        backgroundImage: `url(${bgSaldo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius:10
                    }}
                >
                    <Row style={{padding:'20px 0px 0px 20px'}}>
                        <Col>
                            <Text strong style={{fontSize:18, color:'white'}}>Saldo anda</Text>
                        </Col>
                    </Row>
                    <Row style={{padding:'0px 0px 0px 20px'}}>
                        <Col>
                            <Text strong style={{fontSize:30, color:'white'}}>Rp {showSaldo ? formatToDisplayRupiah(balance) : '•••••••••••'}</Text>
                        </Col>
                    </Row>
                    <Row style={{padding:'0px 20px 15px 20px'}}>
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
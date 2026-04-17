import { useEffect, useState } from 'react';
import { Row, Col, Typography, Image } from 'antd';
import { getDataService } from '../../../api/api-home';
import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;

const Service = () => {
    const navigate = useNavigate();
    const [service, setService] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getService();
        }else{
            navigate('/signin');
        }
    }, []);

    const getService = async()=>{
        try {
            const response = await getDataService();
            setService(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickService = (data)=>{
        navigate('/payment', { state: data });
    };

    return (
        <>
            <Row style={{marginTop:50}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text strong style={{fontSize:'18px'}}>Layanan</Text>
                </Col>
            </Row>
            <div
                style={{
                    marginTop: '2%',
                    overflowX: 'auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: 16,
                        minWidth: 'max-content',
                    }}
                >
                    {service.map((item) => (
                        <div
                            key={item.service_code}
                            onClick={() => handleClickService(item)}
                            style={{
                                textAlign: 'center',
                                cursor: 'pointer',
                                minWidth: 80
                            }}
                        >
                            <Image
                                src={item.service_icon}
                                alt={item.service_name}
                                width={50}
                                preview={false}
                                style={{
                                    filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))',
                                }}
                            />
                            <div style={{ marginTop: 15 }}>
                                <Text>{item.service_name}</Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Service;
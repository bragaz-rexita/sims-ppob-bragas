import { useEffect, useState } from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDataHistory } from '../../../api/api-transaction';
import { formatToDisplayRupiah } from '../../../components/Global/Formatter';
import { Height } from '../../../components/Global/Height';

const { Text, Link } = Typography;

const History = () => {
    const navigate = useNavigate();

    const [dataHistory, setDataHistory] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getTransactionHistory(0);
        }else{
            navigate('/signin');
        }
    }, []);

    const getTransactionHistory = async (customOffset = 0) => {
        try {
            const response = await getDataHistory({
                offset: customOffset,
                limit: limit,
            });

            if (response) {
                const newData = response.data.records;
                if (customOffset === 0) {
                    setDataHistory(newData);
                } else {
                    setDataHistory((prev) => [...prev, ...newData]);
                }
                setOffset(response.data.offset);
                setLimit(response.data.limit);
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

    const handleShowMore = async () => {
        const newOffset = offset + limit;
        try {
            await getTransactionHistory(newOffset);
        } catch (error) {
            console.log(error);
            NotifAlert({
                icon: 'error',
                title: 'Error',
                message: `Gagal memuat data ${error}`,
            });
        }
        
    };

    const handleBack = ()=>{
        navigate('/home');
    };

    return (
        <>
            <Row style={{marginTop:50}}>
                <Col>
                    <Link strong onClick={handleBack} style={{ color: '#ff2222' }}>
                        Kembali ke Beranda
                    </Link>
                    <div style={{height: '30px'}}></div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text style={{fontSize:'18px'}}>Semua Transaksi</Text>
                </Col>
            </Row>
            <Height/>
            <div
                style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    paddingRight: 5
                }}
            >
                {dataHistory.map((item, index) => (
                    <Card
                        key={index}
                        style={{
                            marginBottom: 10,
                            borderRadius: 10,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        }}
                        bodyStyle={{
                            padding: '10px'
                        }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Text
                                    strong
                                    style={{
                                        color: item.transaction_type === 'TOPUP' ? 'green' : 'red',
                                        fontSize:24
                                    }}
                                >
                                    {item.transaction_type === 'TOPUP' ? '+' : '-'} Rp{' '}
                                    {formatToDisplayRupiah(item.total_amount)}
                                </Text>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {item.created_on}
                                    </Text>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'right', alignContent: 'center', paddingRight: 20 }}>
                                <Text strong style={{fontSize:'18px'}}>
                                    {item.transaction_type === 'TOPUP' ? 'Top Up' : item.description}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
            {dataHistory.length % limit === 0 && (
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Link onClick={handleShowMore} style={{ color: '#ff2222' }}>
                            Show More
                        </Link>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default History;
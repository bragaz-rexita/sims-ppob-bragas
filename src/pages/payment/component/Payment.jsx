import { useEffect, useState } from 'react';
import { Row, Col, Typography, Image, Button } from 'antd';
import { InputIDR, InputIDRDisabled } from '../../../components/Global/AppInput';
import { Height } from '../../../components/Global/Height';
import { createTransaction } from '../../../api/api-transaction';
import { NotifAlert, NotifQuestion } from '../../../components/Global/ToastNotif';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSaldoStore } from '../../../stores/saldo-store';
import { formatToDisplayRupiah } from '../../../components/Global/Formatter';

const { Text } = Typography;

const Payment = () => {
    const navigate = useNavigate();
    const balance = useSaldoStore((s) => s.balance);
    const triggerRefresh = useSaldoStore((s) => s.triggerRefresh);

    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/signin');
        }
    }, []);

    const handelPayment = ()=>{
        if(balance < data.service_tariff){
            NotifQuestion({
                icon: 'warning',
                title: 'Peringatan',
                confirmButtonText: 'Klik disini untuk TopUp',
                message: 'Saldo anda tidak mencukupi, silahkan Top Up terlebih dahulu.',
                onCancel: ()=>'',
                onConfirm: () => navigate('/topup'),
            });
            return;
        }else{
            NotifQuestion({
                icon: 'question',
                title: 'Konfirmasi',
                confirmButtonText: 'Ya, lanjutkan Bayar',
                message: `Bayar ${data.service_name} senilai Rp${formatToDisplayRupiah(data.service_tariff)} ?`,
                onCancel: ()=>'',
                onConfirm: () => storeData(),
            });
        }
    };

    const storeData = async()=>{
        const payload = {
            service_code: data.service_code
        };

        try {
            const response = await createTransaction(payload);
            if(response){
                NotifAlert({
                    icon: 'success',
                    title: 'Success',
                    message: `${response.message}`,
                });
                triggerRefresh();
                navigate('/home');
            }
        } catch (error) {
            
        }
    };

    return (
        <>
            <Row style={{marginTop:50}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text style={{fontSize:'18px'}}>Pembayaran</Text>
                </Col>
            </Row>
            <Height/>
            <Row gutter={16}>
                <Col>
                    <Image
                        src={data.service_icon}
                        alt={data.service_name}
                        width={50}
                        preview={false}
                        style={{
                            filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))',
                        }}
                    />
                </Col>
                <Col style={{alignContent:'center'}}>
                    <Text strong style={{fontSize:'20px'}}>{data.service_name}</Text>
                </Col>
            </Row>
            <Height/>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <InputIDRDisabled
                        name="top_up_amount"
                        value={data.service_tariff}
                        
                    />
                    <Height />
                    <Button
                        onClick={()=>handelPayment()}
                        style={{
                            width: '100%',
                            color: 'white',
                            backgroundColor: '#ff3a3a',
                        }}
                    >
                        Bayar
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default Payment;
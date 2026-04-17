import { useEffect, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { InputIDR } from '../../../components/Global/AppInput';
import { Height } from '../../../components/Global/Height';
import { createTopUp } from '../../../api/api-topup';
import { toApiRemoveIDR, formatToDisplayRupiah } from '../../../components/Global/Formatter';
import { NotifAlert, NotifQuestion } from '../../../components/Global/ToastNotif';
import { useSaldoStore } from '../../../stores/saldo-store';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Topup = () => {
    const navigate = useNavigate();
    const triggerRefresh = useSaldoStore((s) => s.triggerRefresh);

    const defaultData = {
        top_up_amount: 0
    };

    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    const isInvalid = errors.top_up_amount || Number(formData.top_up_amount) === 0;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/signin');
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let errorMsg = '';
        if (name === 'top_up_amount') {
            const numberValue = Number(value);

            if (numberValue < 10000) {
                errorMsg = 'Minimal top up adalah Rp 10.000';
            } else if (numberValue > 1000000) {
                errorMsg = 'Maksimal top up adalah Rp 1.000.000';
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));
    };

    const handleNominal = (val)=>{
        setErrors({});
        setFormData((prev) => ({
            ...prev,
            top_up_amount: val,
        }));
    };

    const handleTopup = ()=>{
        NotifQuestion({
            icon: 'question',
            title: 'Konfirmasi',
            confirmButtonText: 'Ya, lanjutkan Top Up',
            message: `Anda yakin untuk Top Up sebesar Rp${formatToDisplayRupiah(formData.top_up_amount)}`,
            onCancel: ()=>'',
            onConfirm: () => storeData(),
        });
    };

    const storeData = async()=>{
        const payload = {
            top_up_amount: toApiRemoveIDR(formData.top_up_amount)
        }

        try {
            const response = await createTopUp(payload);
            if(response){
                NotifAlert({
                    icon: 'success',
                    title: 'Success',
                    message: `${response.message}`,
                });
                triggerRefresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Row style={{marginTop:50}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text style={{fontSize:'18px'}}>Silahkan masukkan</Text>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text strong style={{fontSize:'30px'}}>Nominal Top Up</Text>
                </Col>
            </Row>
            <Row gutter={18}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <InputIDR
                        name="top_up_amount"
                        value={formData.top_up_amount}
                        onChange={handleInputChange}
                    />
                    {errors.top_up_amount && (
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            {errors.top_up_amount}
                        </Text>
                    )}
                    <Height />
                    <Button
                        onClick={()=>handleTopup()}
                        disabled={isInvalid}
                        style={{
                            width: '100%',
                            color: 'white',
                            backgroundColor: isInvalid ? 'gray' : '#ff3a3a',
                        }}
                    >
                        Top Up
                    </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row gutter={10}>
                        <Col>
                            <Button style={{width:120}} onClick={()=>handleNominal(10000)}>Rp10.000</Button>
                        </Col>
                        <Col>
                            <Button style={{width:120}} onClick={()=>handleNominal(20000)}>Rp20.000</Button>    
                        </Col>
                        <Col>
                            <Button style={{width:120}} onClick={()=>handleNominal(50000)}>Rp50.000</Button>
                        </Col>
                    </Row>
                    <Height />
                    <Row gutter={10}>
                        <Col>
                            <Button style={{width:120}} onClick={()=>handleNominal(100000)}>Rp100.000</Button>
                        </Col>
                        <Col>
                            <Button style={{width:120}} onClick={()=>handleNominal(250000)}>Rp250.000</Button>    
                        </Col>
                        <Col>
                            <Button style={{width:120}} onClick={()=>handleNominal(500000)}>Rp500.000</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Topup;
import { Row, Col, Image, Typography } from 'antd';
import logoSims from '../../../assets/images/ppob/logo-ppob.png';
const { Text } = Typography;
const TitleWeb = ()=>{
    return(
        <Row>
            <Col span={24}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Image src={logoSims} width={30} preview={false} />
                    <Text style={{ fontSize: 24, fontWeight: 500 }}>
                        SIMS PPOB - Bragas Rexita E.
                    </Text>
                </div>
            </Col>
        </Row>
    );
};
export default TitleWeb;
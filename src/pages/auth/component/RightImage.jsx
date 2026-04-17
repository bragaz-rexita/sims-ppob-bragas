import { Flex, Image } from 'antd';
import logoSignup from '../../../assets/images/ppob/logo-signup.png'; // sesuaikan path

const LayoutImages = () => {
    return (
        <Flex
            flex={1}
            align="center"
            justify="center"
            style={{ backgroundColor: '#fff1f0' }}
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
    );
};

export default LayoutImages;
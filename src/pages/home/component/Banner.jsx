import { useEffect, useState } from 'react';
import { Row, Col, Typography, Image } from 'antd';
import { getDataBanner } from '../../../api/api-home';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Banner = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getBanner();
        }else{
            navigate('/signin');
        }
    }, []);

    const getBanner = async()=>{
        try {
            const response = await getDataBanner();
            setBanners(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Row style={{marginTop:50}}>
                <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <Text strong style={{fontSize:'18px'}}>Temukan promo menarik</Text>
                </Col>
            </Row>
            <div style={{marginTop:15}}>
                <Slider {...settings}>
                    {banners.map((item, index) => (
                        <div key={index}>
                            <div style={{ padding: '0 8px' }}>
                                <Image
                                    src={item.banner_image}
                                    alt={item.banner_name}
                                    preview={false}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: 10
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default Banner;
import React, { useEffect, useState } from 'react';
import Information from './component/Information';
import Service from './component/Service';
import Banner from './component/Banner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/signin');
        }
    }, []);
    return (
        <React.Fragment>
            <div style={{paddingLeft:'14%', paddingRight:'14%'}}>
                <Information/>
                <Service/>
                <Banner/>
            </div>
        </React.Fragment>
    );
};

export default Home;
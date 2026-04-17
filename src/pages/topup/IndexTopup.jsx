import React, { useEffect, useState } from 'react';
import Information from '../home/component/Information';
import Topup from './component/Topup';
import { useNavigate } from 'react-router-dom';

const IndexTopup = () => {
    const navigate = useNavigate();

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
                <Topup/> 
            </div>
        </React.Fragment>
    );
};

export default IndexTopup;
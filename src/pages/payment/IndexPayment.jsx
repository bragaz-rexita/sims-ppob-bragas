import React, { useEffect, useState } from 'react';
import Information from '../home/component/Information';
import Payment from './component/Payment';
import { useNavigate } from 'react-router-dom';

const IndexPayment = () => {
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
                <Payment/> 
            </div>
        </React.Fragment>
    );
};

export default IndexPayment;
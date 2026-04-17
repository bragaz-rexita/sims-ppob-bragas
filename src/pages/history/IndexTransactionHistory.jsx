import React, { useEffect, useState } from 'react';
import Information from '../home/component/Information';
import History from './component/History';
import { useNavigate } from 'react-router-dom';

const IndexTransactionHistory = () => {
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
                <History/>
            </div>
        </React.Fragment>
    );
};

export default IndexTransactionHistory;
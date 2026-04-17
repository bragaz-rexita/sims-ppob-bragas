import React, { useEffect, useState } from 'react';
import Account from './component/Account';
import { useNavigate } from 'react-router-dom';

const IndexAccount = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/signin');
        }
    }, []);
    return (
        <React.Fragment>
            <div style={{paddingLeft:'30%', paddingRight:'30%'}}>
                <Account/>
            </div>
        </React.Fragment>
    );
};

export default IndexAccount;
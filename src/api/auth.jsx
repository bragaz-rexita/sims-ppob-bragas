import { SendRequest } from '../components/Global/ApiRequest';
import RegistrationRequest from '../components/Global/RegisterRequest';

const login = async (params) => {
    const response = await SendRequest({
        method: 'post',
        prefix: `/login`,
        params: params,
    });
    return response || [];
};

const uploadFile = async (formData) => {
    const response = await RegistrationRequest({
        method: 'post',
        prefix: 'file-upload',
        params: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response || {};
};

const register = async (params) => {
    const response = await RegistrationRequest({
        method: 'post',
        prefix: '/registration',
        params: params,
        headers: { 'Content-Type': 'application/json' },
    });
    return response || {};
};

const verifyRedirect = async (params) => {
    const response = await SendRequest({
        method: 'post',
        prefix: 'auth/verify-redirect',
        params: params,
        token: false,
    });
    return response || {};
};

export { login, uploadFile, register, verifyRedirect };

import { SendRequest } from '../components/Global/ApiRequest';
// import RegistrationRequest from '../components/Global/RegisterRequest';

const getDataProfile = async (params) => {
    const response = await SendRequest({
        method: 'get',
        prefix: `/profile`,
        params: params,
    });
    return response.data || [];
};

const getDataBalance = async (params) => {
    const response = await SendRequest({
        method: 'get',
        prefix: `/balance`,
        params: params,
    });
    return response.data || [];
};

const getDataService = async (params) => {
    const response = await SendRequest({
        method: 'get',
        prefix: `/services`,
        params: params,
    });
    return response.data || [];
};

const getDataBanner = async (params) => {
    const response = await SendRequest({
        method: 'get',
        prefix: `/banner`,
        params: params,
    });
    return response.data || [];
};

export { getDataProfile, getDataBalance, getDataService, getDataBanner };
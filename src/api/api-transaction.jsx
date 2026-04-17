import { SendRequest } from '../components/Global/ApiRequest';

const createTransaction = async (queryParams) => {
    const response = await SendRequest({
        method: 'post',
        prefix: `/transaction`,
        params: queryParams,
    });
    return response.data;
};

const getDataHistory = async (params) => {
    const response = await SendRequest({
        method: 'get',
        prefix: `/transaction/history`,
        params: params,
    });
    return response.data || [];
};

export { createTransaction, getDataHistory };
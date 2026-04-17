import { SendRequest } from '../components/Global/ApiRequest';

const createTopUp = async (queryParams) => {
    const response = await SendRequest({
        method: 'post',
        prefix: `/topup`,
        params: queryParams,
    });
    return response.data;
};

export { createTopUp };
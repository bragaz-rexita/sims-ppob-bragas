import { SendRequest } from '../components/Global/ApiRequest';

const getDataAccount = async (params) => {
    const response = await SendRequest({
        method: 'get',
        prefix: `/profile`,
        params: params,
    });
    return response.data || [];
};

const updateDataAccount = async (queryParams) => {
    const response = await SendRequest({
        method: 'put',
        prefix: `/profile/update`,
        params: queryParams,
    });
    return response.data || [];
};

const updatePhotoProfile = async (formData) => {
    const response = await SendRequest({
        method: 'put',
        prefix: `/profile/image`,
        params: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data || [];
};

export { getDataAccount, updateDataAccount, updatePhotoProfile };
// ApiRequest.jsx
import axios from 'axios';
import Swal from 'sweetalert2';

async function ApiRequest(
    urlParams = { method: 'GET', params: {}, url: '', prefix: '/', token: true }
) {
    const baseURLDef = `${import.meta.env.VITE_API_SERVER}`;

    const instance = axios.create({
        baseURL: urlParams.url || baseURLDef,
    });

    const isFormData = urlParams.params instanceof FormData;

    const request = {
        method: urlParams.method,
        url: urlParams.prefix || '/',
        data: urlParams.params,
        headers: {
            'Accept-Language': 'en_US',
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
    };

    // khusus download file
    if (urlParams.params === 'doc') {
        request.responseType = 'arraybuffer';
        request.headers['Content-Type'] = 'blob';
    }

    // =========================
    // 🔑 TOKEN HANDLING (FIX)
    // =========================
    const tokenRedirect = sessionStorage.getItem('token_redirect');
    const tokenLocal = localStorage.getItem('token');

    const token = tokenRedirect || tokenLocal;

    if (token && (urlParams.prefix !== '/login' || urlParams.token === true)) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await instance(request);
        return {
            ...response,
            error: false,
        };
    } catch (error) {
        console.log('error', error);

        const status = error?.response?.status;
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Something went wrong';

        cekError(status, message);

        return {
            ...error?.response,
            error: true,
        };
    }
}

// =========================
// 🔔 ERROR HANDLER
// =========================
function cekError(status, message = '') {
    console.log('status code', status);

    if (status === 401) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: `${message}, Silahkan login`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/signin';
            }
        });
    } else {
        console.log(message);
    }
}

// =========================
// 🚀 WRAPPER REQUEST
// =========================
const SendRequest = async (queryParams) => {
    try {
        const response = await ApiRequest(queryParams);
        return response;
    } catch (error) {
        console.log('error', error);

        Swal.fire({
            icon: 'error',
            text: error?.message || 'Unknown error',
        });
    }
};

export { ApiRequest, SendRequest };
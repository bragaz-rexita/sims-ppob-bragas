import { message } from 'antd';
import CryptoJS from 'crypto-js';

const formatToDisplayRupiah = (value) => {
    if (value == null || value === '') return '';
    const strValue = String(value);
    const integerPart = strValue.split('.')[0];
    
    const cleanNumber = integerPart.replace(/\D/g, '');
    
    if (!cleanNumber) return '';
    
    const numValue = parseInt(cleanNumber, 10);
    
    if (isNaN(numValue)) return '';
    
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numValue);
};

const toApiRemoveIDR = (value) => {
    if (!value && value !== 0) return null;
    
    if (typeof value === 'number') {
        return value;
    }
    
    if (typeof value === 'string') {
        const cleanedValue = value.replace(/[^\d-]/g, '');
        const numericValue = Number(cleanedValue);
        return isNaN(numericValue) ? null : numericValue;
    }
    
    return null;
};

const secretKey = `${import.meta.env.VITE_KEY_SESSION}`;

// Fungsi untuk mengenkripsi data
const encryptData = (data) => {
    try {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return ciphertext;
    } catch (error) {
        console.error('Encrypt Error:', error);
        return null;
    }
};

const decryptData = (ciphertext) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (decrypted?.error) {
            decrypted.error = false;
        }
        return decrypted;
    } catch (error) {
        return { error: true, message: `Decrypt Error: ${error}` };
    }
};

const getSessionData = () => {
    try {
        const ciphertext = localStorage.getItem('session');

        if (!ciphertext) {
            return {
                error: true,
            };
        }
        const result = decryptData(ciphertext);
        return result;
    } catch (error) {
        return { error: true, message: error };
    }
};

export {
    formatToDisplayRupiah,
    toApiRemoveIDR,
    encryptData,
    getSessionData,
    decryptData,
};

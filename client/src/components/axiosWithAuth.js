import axios from 'axios';

export const axiosWithAuth = () =>
{
    const token = window.localStorage.getItem('atk');
    return axios.create(
        {
            headers: { authorization: token },
            baseURL: 'http://172.16.42.111:5000/api'
        });
};
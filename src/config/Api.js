import { useEffect, useState } from 'react';
import axios from 'axios';
import { Notification } from './Notification';

export const baseImage = "https://cdn.washak.net/"
export const api = axios.create({
    baseURL: 'https://dukanomar.com/api',
    headers: {
        'X-Store-Domain': 'alitest256.dukanomar.com',
    },
});

export const useApiGet = (url, successMsg, errorMsg) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get(url);
                if (isMounted) {
                    setData(response.data);
                    if (successMsg) Notification(successMsg, 'success');
                }
            } catch (error) {
                if (isMounted) {
                    Notification(errorMsg || error.message, 'error');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; 
        };
    }, [url]);

    return { data, loading };
};

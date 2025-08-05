

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Notification } from './Notification';

export const BaseUrl = "https://dukanomar.com/api"
export const baseImage = "https://cdn.washak.net/"



const getStoreDomain = () => {
  const isLocal = window.location.hostname === 'localhost';
  return isLocal ? 'ahmed-shtya.dukanomar.com' : window.location.hostname;
};

export const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'X-Store-Domain': getStoreDomain(),
  },
});

export const useApiGet = (url, successMsg, errorMsg) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if(!url) return
            setLoading(true);
            try {
                const response = await api.get(url);
                if (isMounted) {
                    setData(response.data);
                    if (successMsg) Notification(successMsg, 'success');
                }
            } catch (error) {
                if (isMounted) {
                    setError(error?.response?.data)
                    // Notification(errorMsg || error.message, 'error');
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

    return { data, loading , error };
};




import { useEffect, useState } from 'react';
import { api } from '../config/Api';

export const useMenu = () => {
    const [menu, setmenu] = useState();
    const [loading, setLoading] = useState(true);
    
    const [menuSetting , setMenuSetting] = useState()
    const [loadingSetting, setLoadingSetting] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get('/get-store-menu');
                setmenu(response.data.data);

            } catch (error) { 
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingSetting(true);
            try {
                const response = await api.get('/get-store-menu-settings');
                setMenuSetting(response.data.data);

            } catch (error) { 
                console.log(error);
            } finally {
                setLoadingSetting(false);
            }
        };

        fetchData();
    }, []);



    return { menu, loading , menuSetting , loadingSetting };
};

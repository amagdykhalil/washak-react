import { useEffect, useState } from 'react';
import { api } from '../config/Api';

export const useMenu = () => {
    const [menu, setmenu] = useState({
        "header": {
            "id": 611,
            "user_id": 732,
            "name": "header",
            "position": "header",
            "data": [
                {
                    "text": "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
                    "href": "\/",
                    "target": "_self",
                    "url_type": "site_type_url",
                    "HBstatus": "0OBSERVED",
                    "page_slug": ""
                },
                {
                    "text": "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",
                    "url_type": "category_type_url",
                    "href": "alaanay-alshkhsy",
                    "target": "_self",
                    "HBstatus": "0OBSERVED",
                    "children": [
                        {
                            "text": "\u0645\u0633\u062a\u0644\u0632\u0645\u0627\u062a \u0627\u0644\u0645\u0637\u0628\u062e",
                            "href": "mstlzmat-almtbkh",
                            "icon": "empty",
                            "target": "_self",
                            "title": "",
                            "url_type": "category_type_url",
                            "HBstatus": "0OBSERVED"
                        },
                        {
                            "text": "\u0627\u0644\u0639\u0646\u0627\u064a\u0647 \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
                            "href": "alaanay-alshkhsy",
                            "icon": "empty",
                            "target": "_self",
                            "title": "",
                            "url_type": "category_type_url",
                            "HBstatus": "0OBSERVED"
                        },
                        {
                            "text": "\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0646\u0632\u0644\u064a\u0629",
                            "href": "mntgat-mnzly",
                            "icon": "empty",
                            "target": "_self",
                            "title": "",
                            "url_type": "category_type_url",
                            "HBstatus": "0OBSERVED"
                        }
                    ],
                    "page_slug": "category\/"
                },
                {
                    "text": "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
                    "href": "contact-us",
                    "target": "_self",
                    "url_type": "site_type_url",
                    "HBstatus": "0OBSERVED",
                    "page_slug": ""
                },
                {
                    "text": "\u0627\u0644\u0639\u0631\u0628\u0629",
                    "href": "cart",
                    "target": "_self",
                    "url_type": "custom_type_url",
                    "HBstatus": "0OBSERVED",
                    "page_slug": ""
                }
            ],
            "created_at": "2023-08-22T07:46:16.000000Z",
            "updated_at": "2025-05-16T11:43:00.000000Z"
        },
        "footer": {
            "left": {
                "id": 612,
                "user_id": 732,
                "name": "\u0631\u0648\u0627\u0628\u0637 \u0645\u0647\u0645\u0647",
                "position": "left",
                "data": [
                    {
                        "text": "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
                        "url_type": "site_type_url",
                        "href": "\/",
                        "target": "_self",
                        "page_slug": ""
                    },
                    {
                        "text": "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
                        "url_type": "site_type_url",
                        "href": "contact-us",
                        "target": "_self",
                        "page_slug": ""
                    }
                ],
                "created_at": "2023-08-22T07:46:16.000000Z",
                "updated_at": "2023-08-22T07:46:16.000000Z"
            },
            "center": {
                "id": 613,
                "user_id": 732,
                "name": "\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0648\u0633\u0637\u064a",
                "position": "center",
                "data": [
                    {
                        "text": "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
                        "url_type": "site_type_url",
                        "href": "\/",
                        "target": "_self",
                        "page_slug": ""
                    },
                    {
                        "text": "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
                        "url_type": "site_type_url",
                        "href": "contact-us",
                        "target": "_self",
                        "page_slug": ""
                    }
                ],
                "created_at": "2023-08-22T07:46:16.000000Z",
                "updated_at": "2023-08-22T07:46:16.000000Z"
            },
            "right": {
                "id": 614,
                "user_id": 732,
                "name": "\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u064a\u0645\u0646\u064a",
                "position": "right",
                "data": [
                    {
                        "text": "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
                        "url_type": "site_type_url",
                        "href": "\/",
                        "target": "_self",
                        "page_slug": ""
                    },
                    {
                        "text": "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
                        "url_type": "site_type_url",
                        "href": "contact-us",
                        "target": "_self",
                        "page_slug": ""
                    }
                ],
                "created_at": "2023-08-22T07:46:16.000000Z",
                "updated_at": "2023-08-22T07:46:16.000000Z"
            }
        }
    });
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

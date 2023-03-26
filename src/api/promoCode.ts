import axios from 'axios';
import Service from "../classes/Service";
import {API_CLIENT_URL} from "../constants";
import Product from "../classes/Product";
import PromoCode from "../classes/PromoCode";

export const show = (code: string): () => Promise<PromoCode> => {
    const url = API_CLIENT_URL + 'promo-code/' + code;
    return () => {
        return axios.get(url).then(response => response.data.data)
            .catch(() => ({ }));
    };
};

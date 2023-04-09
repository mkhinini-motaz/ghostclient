import axios from 'axios';
import {API_CLIENT_URL} from "../constants";
import PromoCode from "../classes/PromoCode";
import {getClientToken} from "../support/auth";

export const show = (code: string): () => Promise<PromoCode> => {
    const url = API_CLIENT_URL + 'promo-code/' + code;
    return () => {
        return axios.get(url).then(response => response.data.data)
            .catch(() => ({ }));
    };
};

export function create(points: number): Promise<PromoCode> {
    return getClientToken().then(token => {
        return axios.post(API_CLIENT_URL + 'promo-code', {points}, { headers: { Authorization: 'Bearer ' + token } })
            .then(response => response.data.data);
    });
}

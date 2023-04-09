import Client from "../classes/Client";
import {getClientToken} from "../support/auth";
import axios from "axios";
import {API_CLIENT_URL} from "../constants";
import PromoCode from "../classes/PromoCode";

export function createPromoCode(points): Promise<PromoCode> {
    return getClientToken().then(token => {
        return axios.post(API_CLIENT_URL + 'promo-code', { points }, { headers: { Authorization: 'Bearer ' + token }})
            .then(response => response.data.data);
    });
}

import axios from 'axios';
import {API_CLIENT_URL} from "../constants";
import PromoCode from "../classes/PromoCode";
import {getClientToken} from "../support/auth";
import LoyaltyAction from "../classes/LoyaltyAction";

// TODO: pagination
export const index = (): Promise<LoyaltyAction> => {
    const url = API_CLIENT_URL + 'loyalty-action';
    return getClientToken().then(token => {
        return axios.get(url, { headers: { Authorization: 'Bearer ' + token }})
            .then(response => response.data.data);
    });
};


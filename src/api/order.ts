import axios from 'axios';
import {API_CLIENT_URL, API_URL} from "../constants";
import Client from "../classes/Client";
import {getClientToken} from "../support/auth";
import Translatable from "../classes/Translatable";


export function create({ products, delivery_latitude, delivery_longitude, additional_note, promo_code_id, type, shop_id }) : Promise<Client> {
    return getClientToken().then(token => {
        console.log({shop_id})
        return axios.post(
            API_CLIENT_URL + 'shop/' + shop_id + '/order',
            { products, delivery_latitude, delivery_longitude, additional_note, promo_code_id, type },
            { headers: { Authorization: 'Bearer ' + token }}
        )
        .then(response => response.data.data)
    });
}

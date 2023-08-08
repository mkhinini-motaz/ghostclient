import axios from 'axios';
import {API_CLIENT_URL, API_URL} from "../constants";
import Client from "../classes/Client";
import {getClientToken} from "../support/auth";
import Order from "../classes/Order";

export function index({ page = 1, perPage = 50, orderBy = 'created_at', orderDirection = 'desc' })  : Promise<Order[]> {
    return getClientToken().then(token => {
        return axios.get(
            API_CLIENT_URL + 'order',
            { params: { page, perPage, orderBy, orderDirection }, headers: { Authorization: 'Bearer ' + token }}
        )
            .then(response => response.data.data)
    });
}

export function create({ products, delivery_latitude, delivery_longitude, additional_note, promo_code_id, type, shop_id }) : Promise<Client> {
    return getClientToken().then(token => {
        return axios.post(
            API_CLIENT_URL + 'shop/' + shop_id + '/order',
            { products, delivery_latitude, delivery_longitude, additional_note, promo_code_id, type },
            { headers: { Authorization: 'Bearer ' + token }}
        )
        .then(response => response.data.data)
    });
}

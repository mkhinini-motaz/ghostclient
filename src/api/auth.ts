import axios from 'axios';
import {API_CLIENT_URL, API_URL} from "../constants";
import Client from "../classes/Client";
import {getClientToken} from "../support/auth";
import Translatable from "../classes/Translatable";

export function login({ phone, password }) : Promise<Client> {
    return axios.post(API_CLIENT_URL + 'login', { phone, password })
        .then(response => response.data.data)
}

export function register({ first_name, last_name, gender, birth_date, password, password_confirmation, otp, phone, invite_code }) : Promise<Client> {
    return axios.post(API_CLIENT_URL + 'register', { first_name, last_name, gender, birth_date, password, password_confirmation, otp, phone, invite_code })
        .then(response => response.data.data)
}

export function profile(): Promise<Client> {
    return getClientToken().then(token => {
        return axios.get(API_CLIENT_URL + 'profile', { headers: { Authorization: 'Bearer ' + token }}).then(response => response.data.data);
    });
}

export function requestOtp(phone: string, lang: keyof Translatable): Promise<void> {
    return axios.post(API_URL + 'api/otp/request', { phone, lang })
}

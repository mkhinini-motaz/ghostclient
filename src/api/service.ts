import axios from 'axios';
import Service from "../classes/Service";
import {API_CLIENT_URL} from "../constants";


export default function index(): Promise<Service[]> {
    return axios.get(API_CLIENT_URL + 'service').then(response => response.data.data);
}

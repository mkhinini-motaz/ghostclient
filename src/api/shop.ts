import axios from 'axios';
import Service from "../classes/Service";
import {API_CLIENT_URL} from "../constants";
import Category from "../classes/Category";

export default function category(shopId: number): () => Promise<Category[]> {
    return () => axios.get(API_CLIENT_URL + 'shop/' + shopId + '/category').then(response => {
        return response.data.data});
}

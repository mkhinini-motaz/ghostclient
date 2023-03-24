import axios from 'axios';
import Service from "../classes/Service";
import {API_CLIENT_URL} from "../constants";
import Category from "../classes/Category";
import Product from "../classes/Product";

export const category = (shopId: number): () => Promise<Category[]> => {
    return () => axios.get(API_CLIENT_URL + 'shop/' + shopId + '/category').then(response => {
        return response.data.data});
};

export const product = (product_ids: number[]): () => Promise<Product[]> => {
    const url = API_CLIENT_URL + 'product/search';
    const params = { product_ids };

    return () => {
        return axios.get(url, { params }).then(response => {
            return response.data.data
        })
    };
};

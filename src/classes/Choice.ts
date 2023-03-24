import Product from "./Product";

export default class Choice {
    id?: number;
    product_id: number;
    product_count: number;
    shop_id: number;
    product?: Product;

    constructor(id: number, product_id: number, product_count: number, shop_id: number, product: Product) {
        this.id = id;
        this.product_id = product_id;
        this.product_count = product_count;
        this.shop_id = shop_id;
        this.product = product;
    }
}


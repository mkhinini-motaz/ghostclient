import Product from "./Product";
import Option from "./Option";

export default class Choice {
    id?: number;
    product_id: number;
    product_count: number;
    shop_id: number;
    product?: Product;
    options?: Option[];

    constructor(id: number, product_id: number, product_count: number, shop_id: number, product: Product, options: Option[]) {
        this.id = id;
        this.product_id = product_id;
        this.product_count = product_count;
        this.shop_id = shop_id;
        this.product = product;
        this.options = options;
    }
}


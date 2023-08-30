import Product, {WEIGHTABLE_DEFAULT_STEP} from "./Product";
import Option from "./Option";

export default class Choice {
    id?: number;
    product_id: number;
    product_count: number;
    shop_id?: number;
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

export const choicesCount = (choices: Choice[]) : number => {
    let count = 0;
    choices.forEach((choice: Choice) => {
        count += choice.product_count >= WEIGHTABLE_DEFAULT_STEP ? 1 : choice.product_count;
    });
    return count;
};

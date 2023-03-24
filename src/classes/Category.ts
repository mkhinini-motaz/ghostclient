import Translatable from "./Translatable";
import Product from "./Product";

export default class Category {
    id: number;
    name: Translatable;
    description: Translatable;
    photo: string;
    products: Product[];
    shop_id: number;

    constructor(id: number, name: Translatable, description: Translatable, photo: string, products: Product[], shop_id: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.products = products;
        this.shop_id = shop_id;
    }
}

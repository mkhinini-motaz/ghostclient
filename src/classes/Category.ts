import Translatable from "./Translatable";
import Product from "./Product";

export default class Category {
    id: number;
    name: Translatable;
    description: Translatable;
    photo: string;
    products: Product[];

    constructor(id: number, name: Translatable, description: Translatable, photo: string, products: Product[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.products = products;
    }
}

import Translated from "./Translated";
import Product from "./Product";

export default class Category {
    id: number;
    name: Translated;
    description: Translated;
    photo: string;
    products: Product[];

    constructor(id: number, name: Translated, description: Translated, photo: string, products: Product[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.products = products;
    }
}

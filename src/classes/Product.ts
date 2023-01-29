import Translatable from "./Translatable";
import Category from "./Category";

export default class Product {
    id: number;
    name: Translatable;
    photo: string;
    category_id: number;
    category: Category;
    price: number;
    added_loyalty_points: number;
    // TODO: options_groups
/*
            'id'          => $this->id,
            'type'        => $this->type,
            'photo'       => $this->photo,
            'price'       => $this->price,
            'category_id' => $this->category_id,
            'added_loyalty_points' => $this->added_loyalty_points,
* */
    constructor(id: number, name: Translatable, photo: string, category_id: number, category: Category, price: number, added_loyalty_points: number) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.category = category;
        this.price = price;
        this.category_id = category_id;
        this.added_loyalty_points = added_loyalty_points;
    }
}

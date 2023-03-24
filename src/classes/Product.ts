import Translatable from "./Translatable";
import Category from "./Category";
import OptionGroup from "./OptionGroup";
import Option from "./Option";

export default class Product {
    id: number;
    name: Translatable;
    photo: string;
    category_id: number;
    type: number;
    category: Category;
    option_groups: OptionGroup[];
    price: number;
    added_loyalty_points: number;

    constructor(id: number, name: Translatable, type: number, photo: string, category_id: number, category: Category, option_groups: OptionGroup[],price: number, added_loyalty_points: number) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.photo = photo;
        this.category = category;
        this.option_groups = option_groups;
        this.price = price;
        this.category_id = category_id;
        this.added_loyalty_points = added_loyalty_points;
    }
}

export const TYPE_FIXED = 1;
export const TYPE_WITH_OPTIONS = 2;
export const TYPE_WEIGHTABLE = 3;

export const productPrice = (product: Product, count: number, options: Option[]) : number => {
    let price = product.price;
    if (product.type === TYPE_WITH_OPTIONS) {
        for (let option of options) {
            price += option.price;
        }
    }

    if (product.type === TYPE_WEIGHTABLE) {
        return (price / 1000) * count;
    }

    return price * count;
};

import Translatable from "./Translatable";

export default class Option {
    id: number;
    photo: string;
    name: Translatable;
    description: Translatable;
    option_group_id: number;
    order: number;
    price: number;
    is_selected_by_default: number;

    constructor(id: number, photo: string, name: Translatable, description: Translatable, option_group_id: number, order: number, price: number, is_selected_by_default: number) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.description = description;
        this.option_group_id = option_group_id;
        this.order = order;
        this.price = price;
        this.is_selected_by_default = is_selected_by_default;
    }
}

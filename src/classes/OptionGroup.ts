import Translatable from "./Translatable";
import Option from "./Option";

export default class OptionGroup {
    id: number;
    photo: string;
    name: Translatable;
    description: Translatable;
    options_are_billable: number;
    options_are_quantifiable: number;
    max_options: number;
    min_options: number;
    order: number;
    options: Option[];

    constructor(id: number, photo: string, name: Translatable, description: Translatable, options_are_billable: number, options_are_quantifiable: number, max_options: number, min_options: number, order: number, options: Option[]) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.description = description;
        this.options_are_billable = options_are_billable;
        this.options_are_quantifiable = options_are_quantifiable;
        this.max_options = max_options;
        this.min_options = min_options;
        this.order = order;
        this.options = options;
    }
}

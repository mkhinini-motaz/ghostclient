import Translatable from "./Translatable";
import Shop from "./Shop";

export default class Service {
    name: Translatable;
    photo: string;
    shops: Shop[];

    constructor(name: Translatable, photo: string, shops: Shop[]) {
        this.name = name;
        this.photo = photo;
        this.shops = shops;
    }
}

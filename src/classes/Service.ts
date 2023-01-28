import Translated from "./Translated";
import Shop from "./Shop";

export default class Service {
    name: Translated;
    photo: string;
    shops: Shop[];

    constructor(name: Translated, photo: string, shops: Shop[]) {
        this.name = name;
        this.photo = photo;
        this.shops = shops;
    }
}

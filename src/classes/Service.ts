import Translatable from "./Translatable";
import Shop, {shopIsOpen} from "./Shop";

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

export const serviceIsOpen = (service: Service) => {
    for (let shop of service.shops) {
        if (shopIsOpen(shop)) {
            return true;
        }
    }
    return false;
};

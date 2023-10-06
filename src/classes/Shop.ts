import Translatable from "./Translatable";
import ServiceArea from "./ServiceArea";

export default class Shop {
    id: number;
    name: string;
    description: Translatable;
    photo: string;
    service_area: ServiceArea;
    menu_displayed_lang: keyof Translatable;
    working_hours_today: number[];

    constructor(id: number, name: string, description: Translatable, photo: string, service_area: ServiceArea, menu_displayed_lang: keyof Translatable, working_hours_today: number[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.service_area = service_area;
        this.menu_displayed_lang = menu_displayed_lang;
        this.working_hours_today = working_hours_today;
    }
}

export const shopIsOpen = (shop: Shop) : boolean => {
    const time = Date.now() / 1000;
    return time >= shop.working_hours_today[0] && time < shop.working_hours_today[1];
};


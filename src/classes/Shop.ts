import Translatable from "./Translatable";

export default class Shop {
    id: number;
    name: string;
    description: Translatable;
    photo: string;
    menu_displayed_lang: keyof Translatable;
    working_hours_today: number[];

    constructor(id: number, name: string, description: Translatable, photo: string, service_area: number[][], menu_displayed_lang: keyof Translatable, working_hours_today: number[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.service_area = service_area;
        this.menu_displayed_lang = menu_displayed_lang;
        this.working_hours_today = working_hours_today;
    }
}

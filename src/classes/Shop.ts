import Translatable from "./Translatable";

export default class Service {
    id: number;
    name: string;
    description: Translatable;
    photo: string;
    service_area: number[][];
    menu_displayed_lang: keyof Translatable;

    constructor(id: number, name: string, description: Translatable, photo: string, service_area: number[][], menu_displayed_lang: keyof Translatable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.service_area = service_area;
        this.menu_displayed_lang = menu_displayed_lang;
    }
}

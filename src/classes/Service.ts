import Translated from "./Translated";

export default class Service {
    name: Translated;
    photo: string;

    constructor(name: Translated, photo: string) {
        this.name = name;
        this.photo = photo;
    }
}

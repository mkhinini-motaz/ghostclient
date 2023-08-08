import Translatable from "./Translatable";
import Shop from "./Shop";

export default class ServiceArea {
    name: Translatable;
    area: number[][];
    delivery_fee: number;
    service_fee: number;

    constructor(name: Translatable, area: number[][], delivery_fee: number, service_fee: number) {
        this.name = name;
        this.area = area;
        this.delivery_fee = delivery_fee;
        this.service_fee = service_fee;
    }
}

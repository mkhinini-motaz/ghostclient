import Translatable from "./Translatable";
import PromoCode from "./PromoCode";
import Client from "./Client";
import Choice from "./Choice";
import Product from "./Product";
import LoyaltyAction from "./LoyaltyAction";

export default class Order {
    id: number;
    type: 1|2|3;
    source: 1|2|3;
    status: number;
    is_payed: 0|1;
    total_price: number;
    associated_phone: string;
    delivery_latitude: number;
    delivery_longitude: number;
    delivery_fee: number;
    service_fee: number;
    created_at: number;
    additional_note: string;
    promo_code: PromoCode;
    client: Client;
    choices: Choice[];
    products: Product[];
    loyalty_action?: LoyaltyAction;

    constructor(id: number, type: 1|2|3, source: 1|2|3, status: number, is_payed: 0|1, total_price: number, associated_phone: string, delivery_latitude: number, delivery_longitude: number, delivery_fee: number, service_fee: number, created_at: number, additional_note: string, promo_code: PromoCode, client: Client, choices: Choice[], products: Product[], loyalty_action: LoyaltyAction) {
        this.id = id;
        this.type = type;
        this.source = source;
        this.status = status;
        this.is_payed = is_payed;
        this.total_price = total_price;
        this.associated_phone = associated_phone;
        this.delivery_latitude = delivery_latitude;
        this.delivery_longitude = delivery_longitude;
        this.delivery_fee = delivery_fee;
        this.service_fee = service_fee;
        this.created_at = created_at;
        this.additional_note = additional_note;
        this.promo_code = promo_code;
        this.client = client;
        this.choices = choices;
        this.products = products;
        this.loyalty_action = loyalty_action;
    }
}

export const STATUS_NEW                     = 1;
export const STATUS_ACCEPTED_BY_SHOP        = 2;
export const STATUS_PROCESSING_BY_SHOP      = 3;
export const STATUS_READY_BY_SHOP           = 4;
export const STATUS_REFUSED_BY_SHOP         = 5;
export const STATUS_ACCEPTED_BY_TRANSPORTER = 10;
export const STATUS_PICKED_BY_TRANSPORTER   = 11;
export const STATUS_DELIVERED               = 20;
export const STATUS_CANCELED                = 21;
export const STATUS_CLIENT_NOT_FOUND        = 22;

export const SOURCE_ONLINE   = 1;
export const SOURCE_ON_SITE  = 2;
export const SOURCE_BY_PHONE = 3;

// TODO: duplicated in ./types
export const TYPE_ON_SITE   = 1;
export const TYPE_TAKE_AWAY = 2;
export const TYPE_DELIVERY  = 3;

export const STATUSES = [
    STATUS_NEW,
    STATUS_ACCEPTED_BY_SHOP,
    STATUS_PROCESSING_BY_SHOP,
    STATUS_READY_BY_SHOP,
    STATUS_REFUSED_BY_SHOP,
    STATUS_ACCEPTED_BY_TRANSPORTER,
    STATUS_PICKED_BY_TRANSPORTER,
    STATUS_DELIVERED,
    STATUS_CANCELED,
    STATUS_CLIENT_NOT_FOUND,
];

export const STATUSES_COLORS = {
    [STATUS_NEW]: '#d1d1d1',
    [STATUS_ACCEPTED_BY_SHOP]: '#cfe1fc',
    [STATUS_PROCESSING_BY_SHOP]: '#fcbf49',
    [STATUS_READY_BY_SHOP]: '#caffbf',
    [STATUS_REFUSED_BY_SHOP]: '#ff595e',
    [STATUS_ACCEPTED_BY_TRANSPORTER]: '#cfe1fc',
    [STATUS_PICKED_BY_TRANSPORTER]: '#fcbf49',
    [STATUS_DELIVERED]: '#caffbf',
    [STATUS_CANCELED]: '#ff595e',
    [STATUS_CLIENT_NOT_FOUND]: '#ff595e',
};

export const STATUS_CAN_GO_TO = {
    [STATUS_NEW]: [STATUS_ACCEPTED_BY_SHOP, STATUS_REFUSED_BY_SHOP],
    [STATUS_ACCEPTED_BY_SHOP]: [STATUS_PROCESSING_BY_SHOP, STATUS_REFUSED_BY_SHOP],
    [STATUS_PROCESSING_BY_SHOP]: [STATUS_READY_BY_SHOP],
    [STATUS_READY_BY_SHOP]: [STATUS_ACCEPTED_BY_TRANSPORTER, STATUS_PICKED_BY_TRANSPORTER],
    [STATUS_REFUSED_BY_SHOP]: [],
    [STATUS_ACCEPTED_BY_TRANSPORTER]: [STATUS_PICKED_BY_TRANSPORTER],
    [STATUS_PICKED_BY_TRANSPORTER]: [STATUS_DELIVERED, STATUS_CLIENT_NOT_FOUND],
    [STATUS_DELIVERED]: [],
    [STATUS_CANCELED]: [],
    [STATUS_CLIENT_NOT_FOUND]: [],
};

export const SHOWN_TYPES = [TYPE_TAKE_AWAY, TYPE_DELIVERY];

export const SOURCES = {
    [SOURCE_ONLINE]: 'order:source:online',
    [SOURCE_ON_SITE]: 'order:source:on_site',
    [SOURCE_BY_PHONE]: 'order:source:by_phone',
};

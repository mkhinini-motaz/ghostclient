import Translatable from "./Translatable";
import Shop from "./Shop";
import PromoCode from "./PromoCode";

export default class Client {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    gender: 1|2;
    birth_date: string;
    invite_code: string;
    last_login_at: number;
    loyalty_points_count: number;
    access_token: string;
    promoCodes?: PromoCode[];

    constructor(id: number, first_name: string, last_name: string, phone: string, gender: 1|2, birth_date: string, invite_code: string, last_login_at: number, loyalty_points_count: number, access_token: string, promoCodes: PromoCode[]) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.gender = gender;
        this.birth_date = birth_date;
        this.invite_code = invite_code;
        this.last_login_at = last_login_at;
        this.loyalty_points_count = loyalty_points_count;
        this.access_token = access_token;
        this.promoCodes = promoCodes;
    }
}

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 2;

export const GENDERS = [ GENDER_MALE, GENDER_FEMALE ];

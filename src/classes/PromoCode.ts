import Translatable from "./Translatable";
import Category from "./Category";
import OptionGroup from "./OptionGroup";
import Option from "./Option";

export default class PromoCode {
    id: number;
    code: string;
    reduction_amount: number;
    is_usable: 0|1;
    expires_at: number;
    created_at: number;

    constructor(id: number, code: string, reduction_amount: number, is_usable: 0|1, expires_at: number, created_at: number) {
        this.id = id;
        this.code = code;
        this.reduction_amount = reduction_amount;
        this.is_usable = is_usable;
        this.expires_at = expires_at;
        this.created_at = created_at;
    }
}

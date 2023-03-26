import Translatable from "./Translatable";
import {translate} from "../i18n";
import {formatMoneyDisplay} from "../support/utils";

export default class Option {
    id: number;
    photo: string;
    name: Translatable;
    description: Translatable;
    option_group_id: number;
    order: number;
    price: number;
    quantity?: number;
    is_selected_by_default: number;

    constructor(id: number, photo: string, name: Translatable, description: Translatable, option_group_id: number, order: number, price: number, is_selected_by_default: number, quantity?: number) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.description = description;
        this.option_group_id = option_group_id;
        this.order = order;
        this.price = price;
        this.is_selected_by_default = is_selected_by_default;
        this.quantity = quantity;
    }
}

export const DEFAULT_QUANTITY = 2;

/**
 * @param options {array}
 */
export const indexOptionsByGroup = (options: Option[]) => {
    const indexedOptions: any = {};
    for (let option of options) {
        indexedOptions[option.option_group_id] = indexedOptions[option.option_group_id] || [];
        indexedOptions[option.option_group_id].push(option);
    }

    return indexedOptions;
};


/**
 * @param option                {object}
 * @param selectedLang          {string}
 * @param selectedLangWriteFrom {string}
 *
 * @returns {string}
 */
export const optionOutput = (option: Option, selectedLang: keyof Translatable, selectedLangWriteFrom: 'left'|'right') => {
    let optionOutput = translate(option.name, selectedLang);
    if (option.quantity) {
        optionOutput += ' ' + '+'.repeat(option.quantity);
    }
    if (option.price) {
        optionOutput += ' (+' + formatMoneyDisplay(option.price, selectedLang, selectedLangWriteFrom) + ')';
    }
    return optionOutput;
};


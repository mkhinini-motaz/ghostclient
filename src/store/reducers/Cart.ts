import {
    SET_CHOICE_TYPE_FIXED,
    SET_CART_CHOICES,
    SET_CART_ADDRESS,
    CREATE_CHOICE_TYPE_WITH_OPTIONS,
    DELETE_CART_CHOICE_TYPE_WITH_OPTIONS,
    SET_CART_PROMO_CODE,
    SET_CART_PROMO_CODE_IS_LOADING,
    SET_ADDITIONAL_NOTE,
    SET_ORDER_IN_PROGRESS,
    EMPTY_CART,
    UPDATE_COUNT_CHOICE_TYPE_WITH_OPTIONS,
    SET_TYPE,
    SET_CART_SHOP, SET_SERVICE_AREA, SET_SERVICE_FEE, SET_DELIVERY_FEE
} from '../actions/types';
import { TYPE_DELIVERY } from "../../classes/Order";
import { Action } from "./index";

export const initialCartReducerState = {
    shopId: 0,
    choices: [ ],
    address: { },
    promoCode: null,
    type: TYPE_DELIVERY,
    promoCodeIsLoading: false,
    orderSubmitIsLoading: false,
    additionalNote: '',
    serviceArea: {},
};

export default (state = initialCartReducerState, action: Action) => {
    if (action.type === SET_CART_SHOP) {
        return { ...state, shopId: action.payload };
    }

    if (action.type === SET_CART_CHOICES) {
        return { ...state, choices: action.payload };
    }

    if (action.type === SET_CHOICE_TYPE_FIXED) {
        let productDoesntExist = true;
        let choices = [];
        for (let choice of state.choices) {
            if (choice.product_id === action.payload.product_id) {
                productDoesntExist = false;
                if (action.payload.product_count > 0) {
                    choices.push({ ...choice, ...action.payload });
                }
                continue;
            }
            choices.push(choice);
        }

        if (productDoesntExist) {
            choices.push(action.payload);
        }

        choices = choices.sort((choice1, choice2) => choice1.shop_id - choice2.shop_id); // TODO: order by shopOrder instead of id

        return { ...state, choices: choices };
    }

    if (action.type === CREATE_CHOICE_TYPE_WITH_OPTIONS) {
        action.payload.id_in_cart = action.payload.product_id + '_' + Date.now();
        return { ...state, choices: [ ...state.choices, action.payload ].sort((choice1, choice2) => choice1.shop_id - choice2.shop_id) }; // TODO: order by shopOrder instead of id
    }

    if (action.type === DELETE_CART_CHOICE_TYPE_WITH_OPTIONS) {
        const choices = state.choices.filter(productInfo => productInfo.id_in_cart !== action.payload);
        return { ...state, choices: choices };
    }

    if (action.type === UPDATE_COUNT_CHOICE_TYPE_WITH_OPTIONS) {
        const choices = state.choices.map(productInfo => {
            if (productInfo.id_in_cart === action.payload.product_id_in_cart) {
                productInfo.product_count = action.payload.product_count;
            }

            return productInfo;
        });
        return { ...state, choices: choices };
    }

    if (action.type === SET_CART_ADDRESS) {
        return { ...state, address: action.payload};
    }

    if (action.type === SET_CART_PROMO_CODE) {
        return { ...state, promoCode: action.payload};
    }

    if (action.type === SET_TYPE) {
        return { ...state, type: action.payload};
    }

    if (action.type === SET_ADDITIONAL_NOTE) {
        return { ...state, additionalNote: action.payload};
    }

    if (action.type === SET_SERVICE_AREA) {
        return { ...state, serviceArea: action.payload};
    }

    if (action.type === EMPTY_CART) {
        return { ...initialCartReducerState };
    }

    return state;
};

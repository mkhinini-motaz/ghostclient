
import {
    SET_CHOICE_TYPE_FIXED,
    CREATE_CHOICE_TYPE_WITH_OPTIONS,
    SET_CART_CHOICES,
    SET_CART_ADDRESS,
    SET_CART_PROMO_CODE,
    SET_CART_PROMO_CODE_IS_LOADING,
    DELETE_CART_CHOICE_TYPE_WITH_OPTIONS,
    SET_ADDITIONAL_NOTE,
    SET_ORDER_SUBMIT_IS_LOADING,
    SET_ORDER_IN_PROGRESS,
    EMPTY_CART,
    UPDATE_COUNT_CHOICE_TYPE_WITH_OPTIONS,
    SET_TYPE, SET_CART_SHOP
} from './types';
import {Alert} from "react-native";
import {useDispatch, useSelector} from "../hooks";
import {translate} from "../../i18n";
import Option from "../../classes/Option";

export interface CartChoiceTypeFixedPayload {
    product_id: number,
    product_count: number,
    shop_id: number,

}

export interface CartChoiceTypeWithOptionsPayload {
    product_id: number,
    product_count: number,
    options: Option[],

}

export interface CartChoiceUpdateTypeWithOptionsPayload {

}

export function setCartShop(shopId: number) {
    return { type: SET_CART_SHOP, payload: shopId };
}

export function createChoiceTypeFixed(payload: CartChoiceTypeFixedPayload) {
    return { type: SET_CHOICE_TYPE_FIXED, payload };
}

export function createChoiceTypeWithOptions(payload: CartChoiceTypeWithOptionsPayload) {
    return { type: CREATE_CHOICE_TYPE_WITH_OPTIONS, payload };
}

export function deleteChoiceTypeWithOptions(product_id_in_cart: number) {
    return { type: DELETE_CART_CHOICE_TYPE_WITH_OPTIONS, payload: product_id_in_cart };
}

export function updateCountChoiceTypeWithOptions(payload: CartChoiceUpdateTypeWithOptionsPayload) {
    return { type: UPDATE_COUNT_CHOICE_TYPE_WITH_OPTIONS, payload };
}

export function setChoices(productInfos) {
    return { type: SET_CART_CHOICES, payload: productInfos };
}

export function setCartAddress(address) {
    return { type: SET_CART_ADDRESS, payload: address };
}

export function setCartPromoCode(promoCode) {
    return { type: SET_CART_PROMO_CODE, payload: promoCode };
}

export function setCartPromoCodeIsLoading(status) {
    return { type: SET_CART_PROMO_CODE_IS_LOADING, payload: status };
}

export function setOrderType(type) {
    return { type: SET_TYPE, payload: type };
}

export function setOrderSubmitIsLoading(status) {
    return { type: SET_ORDER_SUBMIT_IS_LOADING, payload: status };
}

export function setAdditionalNote(additionalNote) {
    return { type: SET_ADDITIONAL_NOTE, payload: additionalNote };
}

export function setOrderInProgress(orderIsInProgress) {
    return { type: SET_ORDER_IN_PROGRESS, payload: orderIsInProgress, };
}

export function emptyCart() {
    return { type: EMPTY_CART };
}

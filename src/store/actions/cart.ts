
import {
    SET_CART_PRODUCT_TYPE_FIXED,
    CREATE_CART_PRODUCT_WITH_OPTIONS,
    SET_CART_PRODUCTS,
    SET_CART_ADDRESS,
    SET_CART_PROMO_CODE,
    SET_CART_PROMO_CODE_IS_LOADING,
    DELETE_CART_PRODUCT_WITH_OPTIONS,
    SET_ADDITIONAL_NOTE,
    SET_ORDER_SUBMIT_IS_LOADING,
    SET_ORDER_IN_PROGRESS,
    EMPTY_CART,
    UPDATE_COUNT_CART_PRODUCT_WITH_OPTIONS,
    SET_TYPE
} from './types';

export function setCartProductTypeFixed({ product_id, product_count }) {
    return { type: SET_CART_PRODUCT_TYPE_FIXED, payload: { product_id, product_count } };
}

export function setCartProductTypeWithOptions({ product_id, product_count, options }) {
    return { type: CREATE_CART_PRODUCT_WITH_OPTIONS, payload: { product_id, product_count, options } };
}

export function deleteCartProductTypeWithOptions(product_id_in_cart) {
    return { type: DELETE_CART_PRODUCT_WITH_OPTIONS, payload: product_id_in_cart };
}

export function updateCountCartProductTypeWithOptions({ product_id_in_cart, product_count }) {
    return { type: UPDATE_COUNT_CART_PRODUCT_WITH_OPTIONS, payload: { product_id_in_cart, product_count } };
}

export function setCartProducts(productInfos) {
    return { type: SET_CART_PRODUCTS, payload: productInfos };
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

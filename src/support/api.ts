/**
 * @param choices        {array}
 * @param address        {object}
 * @param promoCode      {object}
 * @param additionalNote {string}
 * @param type           {number}
 *
 * @returns {{ choices: array, delivery_latitude: float, delivery_longitude: float, type: number }}
 */
export const cartReducerDataToOrderSubmitData = ({ choices, address, promoCode, additionalNote, type, shopId }) => {
    const data = {
        delivery_latitude: address.lat,
        delivery_longitude: address.lng,
    };

    if (shopId) {
        data.shop_id = shopId;
    }

    if (type) {
        data.type = type;
    }

    if (additionalNote) {
        data.additional_note = additionalNote;
    }

    if (promoCode) {
        data.promo_code_id = promoCode.id;
    }

    const choicesToSubmit = [];
    let productToSubmit;
    for (let choice of choices) {
        productToSubmit = {
            id: choice.product_id,
            product_count: choice.product_count,
            shop_id: choice.shop_id,
        };

        if (choice.options) {
            productToSubmit.options = [];
            for (let option of choice.options) {
                productToSubmit.options.push({
                    id: option.id,
                    quantity: option.quantity,
                });
            }
        }

        choicesToSubmit.push(choice);
    }

    data.products = choicesToSubmit;

    return data;
};

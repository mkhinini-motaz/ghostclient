import {useCallback, useContext} from "react";
import StoreContext from "./context/StoreContext";
import I18nContext from "./context/I18nContext";
import {availableLangs} from "../i18n";
import AuthContext from "./context/AuthContext";
import Client from "../classes/Client";
import {setClientToken} from "../support/auth";
import {product} from "../api/shop";
import index from "../api/service";
import {alertNetworkError} from "../support/alert";
import {useQuery} from "react-query";

export function useStoreContext() {
    return useContext(StoreContext);
}

export function useI18nContext() {
    return useContext(I18nContext);
}

export function useAuthContext() {
    return useContext(AuthContext);
}

export function useSelector(selector: (state: object) => any) {
    const { state } = useStoreContext();
    return selector(state);
}

export function useDispatch() {
    const { dispatch } = useStoreContext();
    return dispatch;
}

export function useLangWriteFrom() {
    const { lang } = useI18nContext();
    return availableLangs[lang].writeFrom;
}

export function useLangCode() {
    const { lang } = useI18nContext();
    return lang;
}

export function useLang() {
    const { lang } = useI18nContext();
    return { selectedLang: lang, selectedLangWriteFrom: availableLangs[lang].writeFrom };
}

export function useSetLang() {
    const { setLang } = useI18nContext();
    return setLang;
}

export function useClient() : Client {
    const { client } = useAuthContext();
    return client;
}

export function useSetClient() {
    const { setClient } = useAuthContext();
    return setClient;
}

export function useAuthenticateClient() {
    const setClient = useSetClient();
    return (client: Client) => {
        setClient(client);
        return setClientToken(client.access_token);
    }
}

export function useCartData() {
    const { selectedLang } = useLang();
    const { choices, promoCode } = useSelector((state) => state.Cart);
    const productIds = choices.map(choice => choice.product_id);
    const productCallback = useCallback(product(productIds), [productIds.join(',')]);
    const { isLoading: servicesAreLoading, error: servicesError, data: services } = useQuery('service.index', index, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });
    const { isLoading: productsAreLoading, error: productsError, data: products = [] } = useQuery(['shop.product', productIds.join(',')], productCallback, {
        enabled: choices.length > 0,
        onError: (error) => {
            if (error.code === 'ERR_NETWORK') {
                alertNetworkError(selectedLang);
                return;
            }
        },
    });

    // TODO: concider removing multishop support from this part of the code
    const shops = services.map(service => service.shops).flat();
    const choicesByShop = {};
    for (let choice of choices) {
        choicesByShop[choice.shop_id] = choicesByShop[choice.shop_id] || [];
        choicesByShop[choice.shop_id].push(choice);
    }

    return { choices, promoCode, productsAreLoading, productsError, products, shops, servicesAreLoading, servicesError, choicesByShop };
}

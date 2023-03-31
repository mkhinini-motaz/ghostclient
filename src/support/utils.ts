import {defaultLang, translate} from "../i18n";
import {LOCAL, LOCAL_CURRENCY} from "../constants";
import Translatable from "../classes/Translatable";

/**
 * @param amount                {number}
 * @param selectedLang          {string}
 * @param selectedLangWriteFrom {string}
 *
 * @returns {string}
 */

export function formatMoneyDisplay(amount: number, selectedLang: keyof Translatable = defaultLang.code, selectedLangWriteFrom = defaultLang.writeFrom) {
    let formatter = new Intl.NumberFormat(LOCAL, {
        style: 'currency',
        currency: LOCAL_CURRENCY,
    });

    if (selectedLangWriteFrom === 'right') {
        return formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' +
            translate(LOCAL_CURRENCY, selectedLang, true);
    }

    return formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' + translate(LOCAL_CURRENCY, selectedLang, true);
}

}

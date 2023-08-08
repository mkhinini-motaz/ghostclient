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

export const phoneMask = [ '+', '2', '1', '6', ' ', /[234579]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ];

export const otpMask = [ /[0-9]/, ' ', ' ', ' ', /[0-9]/, ' ', ' ', ' ',/[0-9]/, ' ', ' ', ' ', /[0-9]/, ' ', ' ', ' ',/[0-9]/, ' ', ' ', ' ', /[0-9]/ ];

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (unixTimestamp: number, separator = '/') => {
    const date = (new Date(unixTimestamp * 1000));
    const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
    let month = (date.getMonth() + 1).toString();
    month = month.length > 1 ? month : '0' + month;

    return day + separator + month + separator + date.getFullYear().toString();
};

export const formatTime = (unixTimestamp: number) => {
    const date = (new Date(unixTimestamp * 1000));
    let hours = date.getHours().toString();
    hours = hours.length > 1 ? hours : '0' + hours;
    let  minutes = date.getMinutes().toString();
    minutes = minutes.length > 1 ? minutes : '0' + minutes;

    return hours + ':' + minutes;
};

export const formatDateTime = (unixTimestamp: number) => {
    return formatDate(unixTimestamp) + ' ' + formatTime(unixTimestamp);
};

export const strToDate = (date: string, delimiter: string = '-') => {
    const [day, month, year] = date.split(delimiter);
    return new Date(year + '-' + month + '-' + day);
};

/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
 * @param {Array} point   an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
 */
export const pointInPolygon = function (polygon, point) {
    //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        //If a line from the point into infinity crosses this edge
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            // Invert odd
            odd = !odd;
        }
        j = i;

    }
    //If the number of crossings was odd, the point is in the polygon
    return odd;
};

type TimeoutId = ReturnType<typeof setTimeout>;

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>): void => {
        const context = this;
        if (context.timeoutId) {
            clearTimeout(context.timeoutId);
        }

        context.timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

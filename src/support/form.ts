import {GENDERS} from "../classes/Client";
import {translate} from "../i18n";
import {COLOR_PRIMARY} from "../constants";
import Translatable from "../classes/Translatable";

export const FORM_FIELD_TYPE_TEXT = 'FORM_FIELD_TYPE_TEXT';
export const FORM_FIELD_TYPE_PHONE = 'FORM_FIELD_TYPE_PHONE';
export const FORM_FIELD_TYPE_PASSWORD = 'FORM_FIELD_TYPE_PASSWORD';
export const FORM_FIELD_TYPE_DATE = 'FORM_FIELD_TYPE_DATE';
export const FORM_FIELD_TYPE_RADIO = 'FORM_FIELD_TYPE_RADIO';
export const FORM_FIELD_TYPE_BUTTON = 'FORM_FIELD_TYPE_BUTTON';

export const genderRadioButtons = (selectedLang: keyof Translatable, selectedValue: number) => GENDERS.map((value) => ({
    id: 'type_' + value,
    label: translate('common:gender:' + value, selectedLang),
    value: value,
    selected: value === selectedValue,
    color: COLOR_PRIMARY,
    labelStyle: { fontSize: 19 },
}));

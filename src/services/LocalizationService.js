//@flow
const global = window;
const defaultLangCode = 'en';

type locOpt = {
    langCode?: string,
    timeZone?: string,
    localizationMap?: Object
};

type LocalizationService = {
    initialize: locOpt => void,

    langCode?: string,

    timeZone?: string,

    localizationMap?: Object,

    get(locId: string): string,

    tryGet(locId: string): ?string,

    resolveLocalizedText(localizedText: Object): string
};

const service: LocalizationService = {
    initialize(options: locOpt = {}) {
        this.langCode = options.langCode;
        this.timeZone = options.timeZone || moment.tz.guess();
        this.localizationMap = options.localizationMap;

        moment.tz.setDefault(this.timeZone);
        moment.locale(this.langCode);
        numeral.locale(this.langCode);
    },

    get(locId: string) {
        if (!locId) {
            throw new Error(`Bad localization id: (locId = ${locId})`);
        }
        const text = this.localizationMap[locId];

        if (text === undefined) {
            console.error(`Missing localization constant: ${locId}`);

            return `<missing:${locId}>`;
        }
        return text;
    },

    tryGet(locId: string) {
        if (!locId) {
            throw new Error(`Bad localization id: (locId = ${locId})`);
        }
        const text = this.localizationMap[locId];
        if (text === undefined) {
            return null;
        }
        return text;
    },

    resolveLocalizedText(localizedText: Object) {
        if (!localizedText) {
            return '';
        }

        return localizedText[this.langCode] || localizedText[defaultLangCode] || '';
    }
};

export default (global.Localizer = service);

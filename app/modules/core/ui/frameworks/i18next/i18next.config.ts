import i18n, { Resource } from "i18next";
import LanguageDetector, { DetectorOptions } from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { core_FI, core_EN, lunchbreak_FI, lunchbreak_EN, error_FI, error_EN } from "./locales";

export type AvailableLocaleLanguageType = "en-US" | "fi-FI";
export type AvailableLocaleLanguageShortType = "en" | "fi";

export const availableLocaleOptions: Array<{
  locale: AvailableLocaleLanguageType;
  localeShort: AvailableLocaleLanguageShortType;
}> = [
  {
    locale: "en-US",
    localeShort: "en",
  },
  {
    locale: "fi-FI",
    localeShort: "fi",
  },
];

const I18N_LANGUAGE = "i18nextLng";

const detectorOptions: DetectorOptions = {
  order: ["localStorage"],
  lookupLocalStorage: I18N_LANGUAGE,
  caches: ["localStorage"],
};

const resources: Resource = {
  fi: {
    core: core_FI,
    lunchbreak: lunchbreak_FI,
    error: error_FI,
  },
  en: {
    core: core_EN,
    lunchbreak: lunchbreak_EN,
    error: error_EN,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: detectorOptions,
    resources,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });

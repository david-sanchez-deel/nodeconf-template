import { Logger } from '@nestjs/common';
import i18next from 'i18next';

export const dictionary = {
  civica: {
    balance: 'civica.balance',
  },
};

export function i18n(key: string, options?: i18next.TOptions<i18next.StringMap>) {
  return i18next.t(key, options);
}

const logger = new Logger('I18n', false);
i18next.init({
  appendNamespaceToMissingKey: true,
  debug: false,
  missingKeyHandler: (...args) => logger.log(`Translation for ${JSON.stringify(args)} was not found`),
  resources: {
    en: {
      translation: {
        civica: {
          balance: 'Your current balance is 3.0 USD',
        },
      },
    },
    es: {
      translation: {
        civica: {
          balance: 'Tu balance en la tarjeta es de $9.000',
        },
      },
    },
  },
  saveMissing: true,
});

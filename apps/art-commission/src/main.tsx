import i18next from 'i18next';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { HashRouter } from 'react-router-dom';
import common_en from './i18n/en/common.json';
import common_ja from './i18n/ja/common.json';

import App from './app/app';
import { environment } from './environments/environment';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  resources: {
    en: { common: common_en },
    ja: { common: common_ja },
  },
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <HashRouter basename={environment.baseHref}>
        <App />
      </HashRouter>
    </I18nextProvider>
  </StrictMode>
);

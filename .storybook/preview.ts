import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideNzI18n, es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

registerLocaleData(es);

// Styles are loaded via CDN in main.ts



const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story, context) => ({
      ...story(),
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideNzI18n(es_ES),
        importProvidersFrom(TranslateModule.forRoot()),
        TranslateService
      ]
    })
  ]
};

export default preview;
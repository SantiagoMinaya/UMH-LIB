import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Styles are handled via main.ts previewHead configuration



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
        importProvidersFrom(TranslateModule.forRoot()),
        TranslateService
      ]
    })
  ]
};

export default preview;
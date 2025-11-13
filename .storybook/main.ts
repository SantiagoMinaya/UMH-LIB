import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/docs/*.md'
  ],
  addons: [
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../src/assets'],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://unpkg.com/ng-zorro-antd/ng-zorro-antd.min.css">
  `,
  webpackFinal: async (config) => {
    // Excluir Vitest completamente
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@vitest/mocker'] = false;
    config.resolve.alias['vitest'] = false;
    
    // Excluir módulos de Vitest del bundle
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push(/@vitest/);
      config.externals.push(/vitest/);
    }
    
    return config;
  },
};

export default config;
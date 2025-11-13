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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ng-zorro-antd@20.4.0/bundles/ng-zorro-antd.min.css">
    <style>
      /* Asegurar que los estilos de ng-zorro se apliquen */
      .ant-form-item {
        margin-bottom: 24px;
      }
      .ant-form-item-label {
        text-align: left;
        vertical-align: middle;
        flex: 0 0 auto;
        display: inline-block;
        white-space: nowrap;
      }
      .ant-input {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.88);
        font-size: 14px;
        line-height: 1.5714285714285714;
        background-color: #ffffff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        transition: all 0.2s;
      }
      .ant-input:focus {
        border-color: #4096ff;
        box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
        outline: 0;
      }
    </style>
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
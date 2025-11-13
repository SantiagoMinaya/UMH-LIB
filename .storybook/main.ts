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
    <link rel="stylesheet" href="https://unpkg.com/ng-zorro-antd@20.4.0/ng-zorro-antd.css">
    <style>
      .ant-btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 6px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .ant-input {
        box-sizing: border-box;
        margin: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.88);
        font-size: 14px;
        line-height: 1.5714285714285714;
        background-color: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        transition: all 0.2s;
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
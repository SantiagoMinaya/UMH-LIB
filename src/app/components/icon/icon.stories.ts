import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<IconComponent> = {
  title: 'Components/IconComponent',
  component: IconComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: null
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
  ],
  argTypes: {
    name: {
      control: 'text',
      description: 'Propiedad name'
    },
    size: {
      control: 'number',
      description: 'Propiedad size'
    },
    color: {
      control: 'text',
      description: 'Propiedad color'
    },
    className: {
      control: 'text',
      description: 'Propiedad className'
    },
    ariaLabel: {
      control: 'text',
      description: 'Propiedad ariaLabel'
    },
    viewBox: {
      control: 'text',
      description: 'Propiedad viewBox'
    }
  },
  args: {
    name: 'home',
    size: 24,
    color: 'currentColor',
    className: 'Texto ejemplo',
    ariaLabel: 'Texto ejemplo',
    viewBox: '0 0 24 24'
  }
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    name: 'home',
    size: 24,
    color: 'currentColor',
    className: 'Texto ejemplo',
    ariaLabel: 'Texto ejemplo',
    viewBox: '0 0 24 24'
  }
};

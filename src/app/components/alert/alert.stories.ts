import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<AlertComponent> = {
  title: 'Components/AlertComponent',
  component: AlertComponent,
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
    type: {
      control: { type: 'select', options: ['success', 'error', 'warning', 'info'] },
      description: 'Propiedad type'
    },
    title: {
      control: 'text',
      description: 'Propiedad title'
    },
    message: {
      control: 'text',
      description: 'Propiedad message'
    },
    dismissible: {
      control: 'boolean',
      description: 'Propiedad dismissible'
    },
    autoClose: {
      control: 'boolean',
      description: 'Propiedad autoClose'
    },
    duration: {
      control: 'number',
      description: 'Propiedad duration'
    },
    showIcon: {
      control: 'boolean',
      description: 'Propiedad showIcon'
    }
  },
  args: {
    type: 'info',
    title: 'Texto ejemplo',
    message: 'Texto ejemplo',
    dismissible: true,
    autoClose: false,
    duration: 5000,
    showIcon: true
  }
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    type: 'info',
    title: 'Texto ejemplo',
    message: 'Texto ejemplo',
    dismissible: true,
    autoClose: false,
    duration: 5000,
    showIcon: true
  }
};

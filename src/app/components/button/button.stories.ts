import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<ButtonComponent> = {
  title: 'Components/ButtonComponent',
  component: ButtonComponent,
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
    text: {
      control: 'text',
      description: 'Propiedad text'
    },
    disabled: {
      control: 'boolean',
      description: 'Propiedad disabled'
    },
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
      description: 'Propiedad variant'
    }
  },
  args: {
    text: 'Click me',
    disabled: false,
    variant: 'primary'
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    text: 'Click me',
    disabled: false,
    variant: 'primary'
  }
};

export const Botonsecundario: Story = {
  args: {
    text: "Click me",
    disabled: true,
    variant: "primary"
  }
};

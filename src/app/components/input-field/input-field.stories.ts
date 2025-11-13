import type { Meta, StoryObj } from '@storybook/angular';
import { InputFieldComponent } from './input-field.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';

const meta: Meta<InputFieldComponent> = {
  title: 'Components/InputFieldComponent',
  component: InputFieldComponent,
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
        FormsModule,
        NzFormModule,
        NzInputModule,
        NzAutocompleteModule,
        NzIconModule
      ]
    })
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Propiedad label'
    },
    name: {
      control: 'text',
      description: 'Propiedad name'
    },
    placeholder: {
      control: 'text',
      description: 'Propiedad placeholder'
    },
    type: {
      control: 'text',
      description: 'Propiedad type'
    },
    prefix: {
      control: 'select',
      description: 'Propiedad prefix'
    },
    sufix: {
      control: 'select',
      description: 'Propiedad sufix'
    },
    autocompleteOptions: {
      control: 'select',
      description: 'Propiedad autocompleteOptions'
    },
    autocompleteTemplate: {
      control: 'select',
      description: 'Propiedad autocompleteTemplate'
    },
    autocompleteLoadingOptions: {
      control: 'boolean',
      description: 'Propiedad autocompleteLoadingOptions'
    }
  },
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo',
    placeholder: 'Texto ejemplo',
    type: 'text',
    prefix: null,
    sufix: null,
    autocompleteOptions: null,
    autocompleteTemplate: null,
    autocompleteLoadingOptions: false
  }
};

export default meta;
type Story = StoryObj<InputFieldComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo',
    placeholder: 'Texto ejemplo',
    type: 'text',
    prefix: null,
    sufix: null,
    autocompleteOptions: null,
    autocompleteTemplate: null,
    autocompleteLoadingOptions: false
  }
};

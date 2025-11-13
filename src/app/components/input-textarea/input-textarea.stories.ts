import type { Meta, StoryObj } from '@storybook/angular';
import { InputTextAreaComponent } from './input-textarea.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';

const meta: Meta<InputTextAreaComponent> = {
  title: 'Components/InputTextareaComponent',
  component: InputTextAreaComponent,
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
    rows: {
      control: 'number',
      description: 'Propiedad rows'
    },
    prefix: {
      control: 'select',
      description: 'Propiedad prefix'
    },
    sufix: {
      control: 'select',
      description: 'Propiedad sufix'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Propiedad showCharacterCount'
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
    rows: 4,
    prefix: null,
    sufix: null,
    showCharacterCount: true,
    autocompleteOptions: null,
    autocompleteTemplate: null,
    autocompleteLoadingOptions: false
  }
};

export default meta;
type Story = StoryObj<InputTextAreaComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo',
    placeholder: 'Texto ejemplo',
    rows: 4,
    prefix: null,
    sufix: null,
    showCharacterCount: true,
    autocompleteOptions: null,
    autocompleteTemplate: null,
    autocompleteLoadingOptions: false
  }
};

import type { Meta, StoryObj } from '@storybook/angular';
import { InputNumberComponent } from './input-number.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const meta: Meta<InputNumberComponent> = {
  title: 'Components/InputNumberComponent',
  component: InputNumberComponent,
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
        NzInputNumberModule
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
    min: {
      control: 'select',
      description: 'Propiedad min'
    },
    max: {
      control: 'select',
      description: 'Propiedad max'
    },
    precision: {
      control: 'select',
      description: 'Propiedad precision'
    },
    step: {
      control: 'number',
      description: 'Propiedad step'
    },
    disabled: {
      control: 'boolean',
      description: 'Propiedad disabled'
    },
    modo: {
      control: 'select',
      description: 'Propiedad modo'
    },
    formatter: {
      control: 'select',
      description: 'Propiedad formatter'
    },
    parser: {
      control: 'select',
      description: 'Propiedad parser'
    },
    sufijoMoneda: {
      control: 'text',
      description: 'Propiedad sufijoMoneda'
    }
  },
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo',
    placeholder: 'Texto ejemplo',
    min: null,
    max: null,
    precision: null,
    step: 1,
    disabled: false,
    modo: null,
    formatter: null,
    parser: null,
    sufijoMoneda: '€'
  }
};

export default meta;
type Story = StoryObj<InputNumberComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo',
    placeholder: 'Texto ejemplo',
    min: null,
    max: null,
    precision: null,
    step: 1,
    disabled: false,
    modo: null,
    formatter: null,
    parser: null,
    sufijoMoneda: '€'
  }
};

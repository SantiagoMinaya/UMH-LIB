import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/CheckboxComponent',
  component: CheckboxComponent,
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
        NzCheckboxModule
      ]
    })
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Propiedad label'
    },
    disabled: {
      control: 'boolean',
      description: 'Propiedad disabled'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Propiedad indeterminate'
    },
    size: {
      control: { type: 'select', options: ['small', 'default', 'large'] },
      description: 'Propiedad size'
    }
  },
  args: {
    label: 'Texto ejemplo',
    disabled: false,
    indeterminate: false,
    size: 'default'
  }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    label: 'Texto ejemplo',
    disabled: false,
    indeterminate: false,
    size: 'default'
  }
};

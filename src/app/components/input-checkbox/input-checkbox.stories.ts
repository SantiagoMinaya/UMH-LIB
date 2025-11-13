import type { Meta, StoryObj } from '@storybook/angular';
import { InputCheckboxComponent } from './input-checkbox.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const meta: Meta<InputCheckboxComponent> = {
  title: 'Components/InputCheckboxComponent',
  component: InputCheckboxComponent,
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
        NzCheckboxModule
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
    }
  },
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo'
  }
};

export default meta;
type Story = StoryObj<InputCheckboxComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    label: 'Texto ejemplo',
    name: 'Texto ejemplo'
  }
};

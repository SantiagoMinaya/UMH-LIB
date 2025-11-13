import type { Meta, StoryObj } from '@storybook/angular';
import { DatepickerComponent } from './datepicker.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<DatepickerComponent> = {
  title: 'Components/DatepickerComponent',
  component: DatepickerComponent,
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

  },
  args: {

  }
};

export default meta;
type Story = StoryObj<DatepickerComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {

  }
};

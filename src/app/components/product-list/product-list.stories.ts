import type { Meta, StoryObj } from '@storybook/angular';
import { ProductListComponent } from './product-list.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<ProductListComponent> = {
  title: 'Components/ProductListComponent',
  component: ProductListComponent,
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
type Story = StoryObj<ProductListComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {

  }
};

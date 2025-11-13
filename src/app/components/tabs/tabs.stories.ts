import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<TabsComponent> = {
  title: 'Components/TabsComponent',
  component: TabsComponent,
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
    activeTab: {
      control: 'number',
      description: 'Propiedad activeTab'
    },
    tabs: {
      control: 'text',
      description: 'Propiedad tabs'
    },
    disabled: {
      control: 'boolean',
      description: 'Propiedad disabled'
    },
    orientation: {
      control: { type: 'select', options: ['horizontal', 'vertical'] },
      description: 'Propiedad orientation'
    },
    closable: {
      control: 'boolean',
      description: 'Propiedad closable'
    },
    animated: {
      control: 'boolean',
      description: 'Propiedad animated'
    }
  },
  args: {
    activeTab: 0,
    tabs: ['Item 1', 'Item 2'],
    disabled: false,
    orientation: 'horizontal',
    closable: false,
    animated: true
  }
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    activeTab: 0,
    tabs: ['Item 1', 'Item 2'],
    disabled: false,
    orientation: 'horizontal',
    closable: false,
    animated: true
  }
};

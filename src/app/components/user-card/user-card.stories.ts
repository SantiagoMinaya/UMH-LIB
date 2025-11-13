import type { Meta, StoryObj } from '@storybook/angular';
import { UserCardComponent } from './user-card.component';
import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<UserCardComponent> = {
  title: 'Components/UserCardComponent',
  component: UserCardComponent,
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
    name: {
      control: 'text',
      description: 'Propiedad name'
    },
    email: {
      control: 'text',
      description: 'Propiedad email'
    },
    avatar: {
      control: 'text',
      description: 'Propiedad avatar'
    },
    user: {
      control: 'text',
      description: 'Propiedad user'
    },
    variant: {
      control: 'text',
      description: 'Propiedad variant'
    },
    showStatus: {
      control: 'boolean',
      description: 'Propiedad showStatus'
    },
    showEmail: {
      control: 'boolean',
      description: 'Propiedad showEmail'
    },
    showActions: {
      control: 'boolean',
      description: 'Propiedad showActions'
    },
    showStats: {
      control: 'boolean',
      description: 'Propiedad showStats'
    },
    showFollowButton: {
      control: 'boolean',
      description: 'Propiedad showFollowButton'
    },
    isFollowing: {
      control: 'boolean',
      description: 'Propiedad isFollowing'
    }
  },
  args: {
    name: 'Texto ejemplo',
    email: 'Texto ejemplo',
    avatar: 'Texto ejemplo',
    user: {},
    variant: 'default',
    showStatus: true,
    showEmail: true,
    showActions: true,
    showStats: false,
    showFollowButton: false,
    isFollowing: false
  }
};

export default meta;
type Story = StoryObj<UserCardComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    name: 'Texto ejemplo',
    email: 'Texto ejemplo',
    avatar: 'Texto ejemplo',
    user: {},
    variant: 'default',
    showStatus: true,
    showEmail: true,
    showActions: true,
    showStats: false,
    showFollowButton: false,
    isFollowing: false
  }
};

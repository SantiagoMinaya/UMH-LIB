import type { Meta, StoryObj } from '@storybook/angular';
import { InputFieldComponent } from './input-field.component';
import { moduleMetadata } from '@storybook/angular';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const meta: Meta<InputFieldComponent> = {
  title: 'Components/InputField Demo',
  component: InputFieldComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        NzFormModule,
        NzInputModule,
        NzAutocompleteModule,
        NzIconModule,
        FormsModule,
        TranslateModule.forRoot()
      ]
    })
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<InputFieldComponent>;

export const BasicInput: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    type: 'text'
  }
};

export const EmailInput: Story = {
  args: {
    label: 'Email',
    placeholder: 'ejemplo@correo.com',
    type: 'email'
  }
};

export const PasswordInput: Story = {
  args: {
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    type: 'password'
  }
};
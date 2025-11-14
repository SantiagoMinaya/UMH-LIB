import type { Meta, StoryObj } from '@storybook/angular';
import { ZorroDemoComponent } from './zorro-demo.component';
import { moduleMetadata } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

const meta: Meta<ZorroDemoComponent> = {
  title: 'Components/Zorro Demo',
  component: ZorroDemoComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        NzButtonModule,
        NzInputModule,
        NzCardModule,
        NzTagModule,
        NzIconModule,
        FormsModule
      ]
    })
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del componente'
    },
    buttonText: {
      control: 'text',
      description: 'Texto del botón principal'
    },
    inputValue: {
      control: 'text',
      description: 'Valor inicial del input'
    },
    showCard: {
      control: 'boolean',
      description: 'Mostrar como tarjeta o simple'
    }
  }
};

export default meta;
type Story = StoryObj<ZorroDemoComponent>;

export const Default: Story = {
  args: {
    title: 'Demo de Ng-Zorro',
    buttonText: 'Botón Principal',
    inputValue: '',
    showCard: true
  }
};

export const SimpleView: Story = {
  args: {
    title: 'Vista Simple',
    buttonText: 'Click aquí',
    showCard: false
  }
};

export const WithInitialValue: Story = {
  args: {
    title: 'Con Valor Inicial',
    buttonText: 'Procesar',
    inputValue: 'Texto de ejemplo',
    showCard: true
  }
};
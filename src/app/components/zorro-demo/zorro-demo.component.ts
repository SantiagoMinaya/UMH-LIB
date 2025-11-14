import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zorro-demo',
  imports: [
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzTagModule,
    NzIconModule,
    FormsModule
  ],
  templateUrl: './zorro-demo.component.html',
  styleUrl: './zorro-demo.component.scss'
})
export class ZorroDemoComponent {
  @Input() title: string = 'Demo de Ng-Zorro';
  @Input() buttonText: string = 'Click me';
  @Input() inputValue: string = '';
  @Input() showCard: boolean = true;
  @Input() tagColor1: string = 'blue';
  @Input() tagColor2: string = 'green';
  @Input() tagColor3: string = 'red';
  @Input() tagColor4: string = 'orange';
  
  onButtonClick() {
    console.log('Button clicked!');
  }
}
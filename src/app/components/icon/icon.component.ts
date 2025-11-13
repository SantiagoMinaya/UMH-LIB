/**
 * @fileoverview icon component
 * @see {@link ./icon.md} Documentación completa
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {

@Input() name: string = 'home';
@Input() size: number = 24;
@Input() color: string = 'currentColor';
@Input() className: string = '';
@Input() ariaLabel: string = '';
@Input() viewBox: string = '0 0 24 24';

private knownIcons = [
  'home', 'user', 'settings', 'search', 'heart', 'star', 
  'check', 'close', 'arrow-left', 'arrow-right', 'arrow-up', 
  'arrow-down', 'menu', 'more'
];

isKnownIcon(): boolean {
  return this.knownIcons.includes(this.name);
}

}
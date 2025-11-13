/**
 * @fileoverview tabs component
 * @see {@link ./tabs.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() activeTab: number = 0;
  @Input() tabs: any[] = [];
  @Input() disabled: boolean = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() closable: boolean = false;
  @Input() animated: boolean = true;
  @Input() allowAddTab: boolean = false;

  @Output() tabChanged = new EventEmitter<number>();
  @Output() tabClosed = new EventEmitter<number>();
  @Output() tabAdded = new EventEmitter<string>();

  onTabClick(index: number) {
    if (!this.disabled) {
      this.activeTab = index;
      this.tabChanged.emit(index);
    }
  }

  onCloseTab(index: number) {
    this.tabClosed.emit(index);
  }

  addTab(title: string) {
    this.tabs.push({ title, content: '' });
    this.tabAdded.emit(title);
  }

  navigateTab(index: number) {
    if (index >= 0 && index < this.tabs.length) {
      this.onTabClick(index);
    }
  }

  hasProjectedContent(index: number): boolean {
    return false;
  }
}

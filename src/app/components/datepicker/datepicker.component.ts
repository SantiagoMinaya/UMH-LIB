/**
 * @fileoverview datepicker component
 * @see {@link ./datepicker.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  imports: [CommonModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent {
  @Input() value: Date | null = null;
  @Input() placeholder: string = 'Seleccionar fecha';
  @Input() disabled: boolean = false;
  @Input() format: string = 'dd/MM/yyyy';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  
  @Output() dateChange = new EventEmitter<Date | null>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen: boolean = false;

  onDateChange(date: Date | null) {
    this.value = date;
    this.dateChange.emit(date);
  }

  toggle() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }
}

/**
 * @fileoverview checkbox component
 * @see {@link ./checkbox.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [NzCheckboxModule, CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Output() checkedChange = new EventEmitter<boolean>();

  checked: boolean = false;

  onChange = (value: boolean) => {};
  onTouched = () => {};

  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this.onChange(checked);
    this.onTouched();
    this.checkedChange.emit(checked);
  }

  writeValue(value: boolean): void {
    this.checked = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
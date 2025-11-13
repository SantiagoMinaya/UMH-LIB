import { AbstractControl } from '@angular/forms';

declare module '@angular/forms' {
  interface AbstractControl {
    isControlRequired(): boolean;
    controlMaxLength(): number;
    controlMinLength(): number;
    controlMaxValue(): number;
    controlMinValue(): number;
  }
}

// Extend AbstractControl prototype
AbstractControl.prototype.isControlRequired = function(): boolean {
  return this.hasError('required');
};

AbstractControl.prototype.controlMaxLength = function(): number {
  return this.errors?.['maxlength']?.requiredLength ?? Number.MAX_SAFE_INTEGER;
};

AbstractControl.prototype.controlMinLength = function(): number {
  return this.errors?.['minlength']?.requiredLength ?? 0;
};

AbstractControl.prototype.controlMaxValue = function(): number {
  return this.errors?.['max']?.max ?? Number.MAX_SAFE_INTEGER;
};

AbstractControl.prototype.controlMinValue = function(): number {
  return this.errors?.['min']?.min ?? Number.MIN_SAFE_INTEGER;
};
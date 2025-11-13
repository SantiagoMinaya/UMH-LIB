/**
 * @fileoverview dropdown component
 * @see {@link ./dropdown.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Seleccionar...';
  @Input() disabled: boolean = false;
  @Input() searchable: boolean = false;
  @Input() ariaLabel: string = 'Dropdown';
  @Input() selectedValue: any = null;
  
  @Output() selectionChange = new EventEmitter<any>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen: boolean = false;
  searchTerm: string = '';
  filteredOptions: DropdownOption[] = [];

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  get selectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.selectedValue);
    return selected ? selected.label : '';
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    if (this.disabled) return;
    this.isOpen = true;
    this.opened.emit();
  }

  close(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.filteredOptions = this.options;
    this.closed.emit();
  }

  selectOption(option: DropdownOption): void {
    if (option.disabled) return;
    this.selectedValue = option.value;
    this.selectionChange.emit(option.value);
    this.close();
  }

  onSearch(event: any): void {
    const term = event.target.value.toLowerCase();
    this.filteredOptions = this.options.filter(option => 
      option.label.toLowerCase().includes(term)
    );
  }
}
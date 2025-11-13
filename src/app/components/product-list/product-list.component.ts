/**
 * @fileoverview product-list component
 * @see {@link ./product-list.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() title: string = '';
  @Input() showSearch: boolean = true;
  @Input() loading: boolean = false;
  @Input() products: any[] = [];
  @Input() columns: number = 3;
  @Input() showPagination: boolean = false;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  
  @Output() productClick = new EventEmitter<any>();
  @Output() addToCart = new EventEmitter<any>();
  @Output() toggleFavorite = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';
  filteredProducts: any[] = [];

  ngOnInit() {
    this.filteredProducts = this.products;
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.search.emit(this.searchTerm);
    this.filterProducts();
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => 
        product.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onProductClick(product: any) {
    this.productClick.emit(product);
  }

  onAddToCart(product: any) {
    this.addToCart.emit(product);
  }

  onToggleFavorite(product: any) {
    this.toggleFavorite.emit(product);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onImageError(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTA4LjI4NCA3MCA5NS4yODQgNzAgMTAwIDcwWk0xMDAgMTMwQzEwOC4yODQgMTMwIDk1LjI4NCAxMzAgMTAwIDEzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
  }
}

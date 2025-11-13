/**
 * @fileoverview user-card component
 * @see {@link ./user-card.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Componente para mostrar información de usuario en formato tarjeta
 * 
 * @description
 * Este componente muestra la información básica de un usuario
 * incluyendo nombre, email y avatar en un formato de tarjeta.
 * 
 * @example
 * ```html
 * <app-user-card 
 *   [name]="'Juan Pérez'" 
 *   [email]="'juan@example.com'"
 *   [avatar]="'assets/avatar.jpg'">
 * </app-user-card>
 * ```
 */
@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  /**
   * Nombre del usuario
   * @default ''
   */
  @Input() name: string = '';

  /**
   * Email del usuario
   * @default ''
   */
  @Input() email: string = '';

  /**
   * URL del avatar del usuario
   * @default ''
   */
  @Input() avatar: string = '';
  
  @Input() user: any = {};
  @Input() variant: string = 'default';
  @Input() showStatus: boolean = true;
  @Input() showEmail: boolean = true;
  @Input() showActions: boolean = true;
  @Input() showStats: boolean = false;
  @Input() showFollowButton: boolean = false;
  @Input() isFollowing: boolean = false;
  
  @Output() message = new EventEmitter<void>();
  @Output() call = new EventEmitter<void>();
  @Output() more = new EventEmitter<void>();
  @Output() toggleFollow = new EventEmitter<boolean>();
  

  
  onMessage() {
    this.message.emit();
  }
  
  onCall() {
    this.call.emit();
  }
  
  onMore() {
    this.more.emit();
  }
  
  onToggleFollow() {
    this.isFollowing = !this.isFollowing;
    this.toggleFollow.emit(this.isFollowing);
  }
}
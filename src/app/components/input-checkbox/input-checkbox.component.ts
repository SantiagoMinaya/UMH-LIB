/**
 * @fileoverview input-checkbox component
 * @see {@link ./input-checkbox.md} Documentación completa
 */

import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    forwardRef,
    Inject,
    Injector,
    INJECTOR,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    NgControl
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
/**
 * Componente de campo de tipo checkbox con soporte para:
 * - Integración con formularios reactivos y template-driven (ControlValueAccessor)
 * - Validaciones de formulario con mensajes de error personalizables
 * - Etiqueta descriptiva vinculada al checkbox
 * - Estado deshabilitado
 *
 * Implementa la filosofía de InputFieldComponent pero adaptada a un checkbox.
 */
@Component({
    selector: 'app-input-checkbox',
    imports: [CommonModule, FormsModule, NzFormModule, NzCheckboxModule, TranslateModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputCheckboxComponent),
            multi: true,
        },
    ],
    template: `
        <nz-form-item>
            <nz-form-control
                [nzErrorTip]="parsearError((errorMessage??'') | translate)??''"
                [nzValidateStatus]="ngControl?.control!"
            >
                <label nz-checkbox
                       [ngModel]="value"
                       (ngModelChange)="handleChange($event)"
                       [nzDisabled]="disabled"
                       [attr.name]="name"
                       [attr.id]="name"
                       (blur)="onTouched()">
                    {{ label }}
                </label>
            </nz-form-control>
        </nz-form-item>
    `,
})
export class InputCheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
    /**
     * Mensajes de error por defecto para validaciones comunes.
     */
    private defaultErrors: { [key: string]: string } = {
        requiredTrue: '$$$_err_requerido_$$$'
    };
    //*********************************
    // EVENTOS
    //*********************************
    /**
     * Evento que emite el valor actual cuando cambia el estado del checkbox.
     */
    @Output() valueChange = new EventEmitter<boolean>();
    //*********************************
    // ENTRADAS
    //*********************************
    /**
     * Texto de la etiqueta asociada al checkbox.
     */
    @Input() label: string = '';
    /**
     * Nombre del control, útil para formularios template-driven.
     */
    @Input() name: string = '';
    /**
     * Mensajes de error personalizados.
     * Se mezclan con los mensajes por defecto.
     */
    private _customErrors: { [key: string]: string } | null = null;
    @Input()
    set customErrors(errors: { [key: string]: string }) {
        this._customErrors = {
            ...this.defaultErrors,
            ...errors
        };
    }
    get customErrors(): { [key: string]: string } {
        return this._customErrors ?? {};
    }
    //*********************************
    // ESTADO DEL CONTROL
    //*********************************
    /**
     * Valor actual del checkbox.
     * `true` si está marcado, `false` si no lo está.
     */
    value: boolean = false;
    /**
     * Indica si el control está deshabilitado.
     */
    disabled: boolean = false;
    /**
     * Referencia al control de Angular Forms asociado al componente.
     */
    ngControl: NgControl | null = null;
    /**
     * Subject utilizado para liberar recursos al destruir el componente.
     */
    private destroy$ = new Subject<void>();
    //*********************************
    // CONSTRUCTOR E INICIALIZACIÓN
    //*********************************
    constructor(@Inject(INJECTOR) private readonly _injector: Injector) {}
    ngOnInit(): void {
        try {
            this.ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
            if (this.ngControl) {
                this.ngControl.valueAccessor = this;
            }
        } catch {
            this.ngControl = null;
        }
        if (this.ngControl != null && (!this.name || this.name === '')) {
            this.name = this.ngControl.name + "";
        }
        if (this._customErrors == null) {
            this._customErrors = {
                ...this.defaultErrors
            };
        }
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    //*********************************
    // ERRORES
    //*********************************
    /**
     * Clave del error actual del control.
     */
    get errorKey(): string | null {
        const control = this.ngControl?.control;
        if (!control || !control.touched || !control.errors) {
            return null;
        }
        for (const key of Object.keys(control.errors)) {
            if (this.customErrors[key]) {
                return key;
            }
        }
        return null;
    }
    /**
     * Mensaje de error actual, traducido si corresponde.
     */
    get errorMessage(): string | null {
        const keyError = this.errorKey;
        if (keyError == null) return null;
        return this.customErrors[keyError];
    }
    /**
     * Permite enriquecer el mensaje de error con información adicional.
     * En este caso, simplemente lo devuelve sin cambios.
     */
    parsearError(error: string): string | null {
        return error;
    }
    //*********************************
    // CONTROL VALUE ACCESSOR
    //*********************************
    /**
     * Función llamada por Angular para propagar cambios.
     */
    onChange: (value: boolean) => void = () => {};
    /**
     * Función llamada por Angular cuando el control es tocado.
     */
    onTouched: () => void = () => {};
    /**
     * Escribe un valor en el control desde el modelo externo.
     */
    writeValue(value: boolean | null): void {
        this.value = this.normalizeBoolean(value);
    }
    /**
     * Registra la función que se llamará cuando cambie el valor.
     */
    registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }
    /**
     * Registra la función que se llamará cuando el control sea marcado como tocado.
     */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
    /**
     * Cambia el estado deshabilitado del control.
     */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    //*********************************
    // EVENTOS DE USUARIO
    //*********************************
    /**
     * Maneja el evento de cambio de estado del checkbox.
     * @param checked Nuevo estado del checkbox.
     */
    handleChange(checked: boolean): void {
        this.value = this.normalizeBoolean(checked);
        this.onChange(this.value);
        this.valueChange.emit(this.value);
    }
    /**
     * Convierte cualquier valor a booleano.
     * - 'true' o true => true
     * - cualquier otro valor => false
     * @param value Valor a convertir
     * @returns Booleano normalizado
     */
    private normalizeBoolean(value: boolean | string | null): boolean {
        return value === true || value === 'true';
    }
}
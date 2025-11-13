/**
 * @fileoverview input-number component
 * @see {@link ./input-number.md} Documentación completa
 */

import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostListener,
    Inject,
    Injector,
    INJECTOR,
    Input,
    OnInit
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    NgControl
} from '@angular/forms';
import { ExtensionsModule } from '@extensions/extensions.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
/** Modos de visualización del input numérico */
export enum InputNumberModo {
    Porcentaje = 'porcentaje',
    Moneda = 'moneda',
}
/**
 * Componente de Input numérico avanzado.
 * Soporta formato de moneda o porcentaje, validaciones, y precision configurable.
 * Implementa ControlValueAccessor para integrarse con formularios reactivos y template-driven.
 */
@Component({
    selector: 'app-input-number',
    imports: [NzFormModule, NzInputNumberModule, FormsModule, CommonModule, TranslateModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberComponent),
            multi: true,
        },
    ],
    templateUrl: './input-number.component.html',
    styleUrl: './input-number.component.scss',
})
export class InputNumberComponent implements ControlValueAccessor, OnInit {
    /** Mensajes de error por defecto */
    private defaultErrors: { [key: string]: string } = {
        required: '$$$_err_requerido_$$$',
        min: '$$$_no_llega_valor_minimo_$$$',
        max: '$$$_supera_valor_maximo_$$$'
    };
    //*********************************
    // INPUTS
    //*********************************
    /** Etiqueta del control */
    @Input() label: string = '';
    /** Nombre del control */
    @Input() name: string = '';
    /** Placeholder del input */
    @Input() placeholder: string = '';
    /** Valor mínimo permitido */
    @Input() min: number | null = null;
    /** Valor máximo permitido */
    @Input() max: number | null = null;
    /** Cantidad de decimales a mostrar */
    @Input() precision: number | null = null;
    /** Paso de incremento/decremento */
    @Input() step: number = 1;
    /** Indica si el control está deshabilitado */
    @Input() disabled: boolean = false;
    /** Modo de visualización: porcentaje o moneda */
    @Input() modo: InputNumberModo | null = null;
    /** Función personalizada para formatear el valor */
    @Input() formatter: ((value: number | null) => string) | null = null;
    /** Función personalizada para parsear el valor */
    @Input() parser: ((value: string | null) => number) | null = null;
    /** Sufijo de moneda a mostrar cuando modo=Moneda */
    @Input() sufijoMoneda: string = '€';
    /** Errores personalizados */
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
    /** Valor actual */
    value: number | null = null;
    /** Indica si el input tiene foco */
    isFocused = false;
    /** Referencia al control NgControl */
    ngControl: NgControl | null = null;
    //*********************************
    // CONSTRUCTOR E INICIALIZACIÓN
    //*********************************
    constructor(
        @Inject(INJECTOR) private readonly _injector: Injector,
        private readonly _cdr: ChangeDetectorRef
    ) {}
    /** Inicializa ngControl y errores por defecto */
    ngOnInit(): void {
        try {
            this.ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
            if (this.ngControl) {
                this.ngControl.valueAccessor = this;
            }
        } catch {
            this.ngControl = null;
        }
        if (this.ngControl != null && (this.name == null || this.name == "")) {
            this.name = this.ngControl.name + "";
        }
        if(this._customErrors == null) {
            this._customErrors = {
                ...this.defaultErrors
            };
        }
    }
    //*********************************
    // PROPIEDADES COMPUTADAS
    //*********************************
    /** Valor máximo calculado */
    get maxValue(): number {
        return this.max ?? this.ngControl?.control?.controlMaxValue() ?? Number.MAX_SAFE_INTEGER;
    }
    /** Valor mínimo calculado */
    get minValue(): number {
        return this.min ?? this.ngControl?.control?.controlMinValue() ?? Number.MIN_SAFE_INTEGER;
    }
    /** Clave del error actual */
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
    /** Mensaje de error actual */
    get errorMessage(): string | null {
        const keyError = this.errorKey;
        if(keyError == null) return null;
        return this.customErrors[keyError];
    }
    /** Indica si el control es requerido */
    get isRequired(): boolean {
        return this.ngControl?.control?.isControlRequired?.() ?? false;
    }
    /** Formatter para NzInputNumber */
    get formatterData(): ((value: number | null) => string) | null {
        if(this.isFocused) return null;
        if (this.modo === InputNumberModo.Moneda) {
            return (value: number | null) => {
                if (value == null || isNaN(value) || (value as any) === "") return '';
                // Usamos toLocaleString para un formato de moneda correcto y localizado.
                return value.toLocaleString('es-ES', {
                    useGrouping: true,
                    minimumFractionDigits: this.precision ?? 2,
                    maximumFractionDigits: this.precision ?? 2,
                }) + ` ${this.sufijoMoneda}`;
            };
        }
        if (this.modo === InputNumberModo.Porcentaje) {
            return (value: number | null) => {
                if (value == null || isNaN(value) || (value as any) === "") return '';
                return value.toLocaleString('es-ES', {
                    useGrouping: true,
                    minimumFractionDigits: this.precision ?? 2,
                    maximumFractionDigits: this.precision ?? 2,
                }) + ' %';
            };
        }
        return this.formatter;
    }
    /** Parser para NzInputNumber */
    get parserData(): ((value: string) => number) | null {
        if(this.isFocused) return null;
        if (this.modo === InputNumberModo.Moneda || this.modo === InputNumberModo.Porcentaje) {
            return (value: string) => {
                if (!value) return NaN;
                // Limpia el string:
                // 1. Quita todo lo que no sea un dígito, un signo negativo, un punto o una coma.
                // 2. Reemplaza la coma decimal por un punto.
                const cleaned = value
                    .replace(/[^0-9,-.]/g, '')
                    .replace(',', '.');
                // parseFloat se encargará del resto.
                return parseFloat(cleaned);
            };
        }
        return this.parser;
    }
    //*********************************
    // CONTROL VALUE ACCESSOR
    //*********************************
    onChange = (value: any) => {};
    onTouched = () => {};
    writeValue(value: any): void {
        this.onTouched();
        this.value = value ?? null;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    /** Evento cuando el valor cambia */
    onValueChange(value: number | null): void {
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }
    //*********************************
    // HOST LISTENERS
    //*********************************
    @HostListener('focusin')
    onFocus(): void {
        setTimeout(() => {
            this.isFocused = true;
            // Forzar re-render del valor para aplicar el formatter
            const currentValue = this.value;
            this.value = null;
            this._cdr.detectChanges();
            this.value = currentValue;
            this._cdr.detectChanges();
        }, 0);
    }
    @HostListener('focusout')
    onBlur(): void {
        setTimeout(() => {
            this.isFocused = false;
            // Forzar re-render del valor para aplicar el formatter
            const currentValue = this.value;
            this.value = null;
            this._cdr.detectChanges();
            this.value = currentValue;
            this._cdr.detectChanges();
        }, 0);
    }
    @HostListener('keydown', ['$event'])
    onKeyDownHandler(event: KeyboardEvent): void {
        const input = event.target as HTMLInputElement;
        const key = event.key;
        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9', ',', '.', '-'];
        const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'];
        const isModifierKey = event.ctrlKey || event.metaKey || event.altKey;
        // Si es una tecla de navegación o modificador, no hacemos nada
        if (isModifierKey || navigationKeys.includes(key)) return;
        // Validar que la tecla presionada sea un número o un separador decimal
        if (!allowedKeys.includes(key)) {
            event.preventDefault();
            return;
        }
        // Solo permitir un separador decimal
        const isDecimalSeparator = key === ',' || key === '.';
        const alreadyHasSeparator = input.value.includes(',') || input.value.includes('.');
        if (isDecimalSeparator && alreadyHasSeparator) {
            event.preventDefault();
            return;
        }
        // Solo permitir '-' al principio
        if (key === '-') {
            const cursorPos = input.selectionStart ?? 0;
            if (cursorPos !== 0 || input.value.includes('-')) {
                event.preventDefault();
                return;
            }
        }
        // Reemplazar coma por punto en tiempo real
        if (key === ',') {
            event.preventDefault();
            const start = input.selectionStart ?? 0;
            const end = input.selectionEnd ?? 0;
            const newValue = input.value.slice(0, start) + '.' + input.value.slice(end);
            input.value = newValue;
            // Disparar evento de input manualmente
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(input, newValue);
            input.setSelectionRange(start + 1, start + 1);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
    //*********************************
    // MÉTODOS AUXILIARES
    //*********************************
    /**
     * Devuelve mensaje de error enriquecido con valores mínimos o máximos.
     * @param error Mensaje traducido del error
     * @returns Mensaje final enriquecido
     */
    parsearError(error: string): string | null {
        const key = this.errorKey;
        if (key == null) return error;
        const datosError = {
            min: this.minValue + "",
            max: this.maxValue + ""
        }[key];
        if (datosError == null) return error;
        return `${error} (${datosError})`;
    }
}
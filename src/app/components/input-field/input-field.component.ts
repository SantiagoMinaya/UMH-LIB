/**
 * @fileoverview input-field component
 * @see {@link ./input-field.md} Documentación completa
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
    Output,
    TemplateRef
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    NgControl
} from '@angular/forms';
import { ExtensionsModule } from '@extensions/extensions.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { debounceTime, distinctUntilChanged, EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
/**
 * Componente de campo de entrada (input) con soporte para:
 * - Autocompletado remoto
 * - Validaciones de formulario
 * - Prefijo y sufijo (texto o template)
 * - Mensajes de error personalizados
 *
 * Implementa `ControlValueAccessor` para integrarse con formularios reactivos y template-driven.
 */
@Component({
    selector: 'app-input-field',
    imports: [NzFormModule, NzInputModule, TranslateModule, NzAutocompleteModule, CommonModule, FormsModule, NzIconModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFieldComponent),
            multi: true,
        },
    ],
    templateUrl: './input-field.component.html',
})
export class InputFieldComponent implements ControlValueAccessor, OnInit, OnDestroy {
    /** Mensajes de error por defecto para validaciones comunes */
    private defaultErrors: { [key: string]: string } = {
        required: '$$$_err_requerido_$$$',
        email: '$$$_err_formato_email_$$$',
        minlength: '$$$_no_llega_tam_minimo_de_caracteres_$$$',
        maxlength: '$$$_supera_tam_maximo_de_caracteres_$$$',
        pattern: '$$$_formato_erroneo_$$$',
        min: '$$$_no_llega_valor_minimo_$$$',
        max: '$$$_supera_valor_maximo_$$$',
        invalidUrl: '$$$_url_invalida_$$$',
    };
    //*********************************
    // EVENTOS
    //*********************************
    /** Evento que emite el valor actual al cambiar el input */
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    /** Evento que se dispara al solicitar opciones de autocompletado */
    @Output() loadAutocompleteOptions = new EventEmitter<SearchAutocompleteData>();
    //*********************************
    // ENTRADAS DEL COMPONENTE
    //*********************************
    /** Etiqueta del campo */
    @Input() label: string = '';
    /** Nombre del control */
    @Input() name: string = '';
    /** Placeholder del input */
    @Input() placeholder: string = '';
    /** Tipo de input (text, number, email, etc.) */
    @Input() type: string = 'text';
    /** Prefijo del input (texto o template) */
    @Input() prefix: string | TemplateRef<void> | null = null;
    /** Sufijo del input (texto o template) */
    @Input() sufix: string | TemplateRef<void> | null = null;
    /** Mensajes de error personalizados */
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
    /** Opciones de autocompletado */
    @Input() autocompleteOptions: InputFieldAutocompleteOption[] | null = null;
    /** Plantilla personalizada para renderizar opciones de autocompletado */
    @Input() autocompleteTemplate: TemplateRef<{ $implicit: InputFieldAutocompleteOption }> | null = null;
    /** Indica si se están cargando opciones de autocompletado */
    @Input() autocompleteLoadingOptions: boolean = false;
    //*********************************
    // ESTADO DEL CONTROL
    //*********************************
    /** Valor actual del input */
    value: string = '';
    /** Indica si el control está deshabilitado */
    disabled = false;
    /** Referencia a NgControl si el input forma parte de un formulario */
    ngControl: NgControl | null = null;
    /** Subject para destruir suscripciones al destruir el componente */
    private destroy$ = new Subject<void>();
    //*********************************
    // CONSTRUCTOR E INICIALIZACIÓN
    //*********************************
    constructor(@Inject(INJECTOR) private readonly _injector: Injector) {
        this.searchAutocompleteSuggestions$.pipe(
            debounceTime(300), // espera 300ms después del último valor emitido
            distinctUntilChanged((a, b) => {
                if(a?.trim() === b?.trim()) {
                    return true;
                } else {
                    return false;
                }
            }),
            switchMap(valor => {
                this.loadAutocompleteOptions.emit({
                    searchValue: valor
                });
                return EMPTY;
            }),
            takeUntil(this.destroy$)  // Se cancela la suscripción cuando el componente se destruya
        ).subscribe();
    }
    /** Inicializa NgControl y valores de error */
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
    /** Cancela suscripciones al destruir el componente */
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    //*********************************
    // PROPIEDADES COMPUTADAS
    //*********************************
    /** Indica si el input es requerido */
    get isRequired(): boolean {
        return this.ngControl?.control?.isControlRequired?.() ?? false;
    }
    /** Longitud máxima permitida */
    get maxlength(): number {
        return this.ngControl?.control?.controlMaxLength?.() ?? Number.MAX_SAFE_INTEGER;
    }
    /** Longitud mínima requerida */
    get minlength(): number {
        return this.ngControl?.control?.controlMinLength?.() ?? 0;
    }
    /** Valor máximo permitido */
    get max(): number {
        return this.ngControl?.control?.controlMaxValue?.() ?? Number.MAX_SAFE_INTEGER;
    }
    /** Valor mínimo permitido */
    get min(): number {
        return this.ngControl?.control?.controlMinValue?.() ?? Number.MIN_SAFE_INTEGER;
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
    //*********************************
    // CONTROL VALUE ACCESSOR
    //*********************************
    onChange = (value: any) => {};
    onTouched = () => {};
    writeValue(value: any): void {
         this.onTouched();
        this.value = value ?? "";
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
    /** Subject para manejar debounce de autocompletado */
    private searchAutocompleteSuggestions$ = new Subject<string>();
    /** Maneja el input del usuario */
    handleInput(value: string): void {
        this.value = value;
        this.onChange(this.value);
        this.onTouched();
        this.valueChange.emit(this.value);
        this.searchAutocompleteSuggestions$.next(value);
    }
    //*********************************
    // MÉTODOS AUXILIARES
    //*********************************
    /**
     * Devuelve el mensaje de error enriquecido con datos de longitud o rango según el tipo de error.
     * @param error Mensaje de error original
     * @returns Mensaje de error enriquecido
     */
    parsearError(error: string): string | null {
        const key = this.errorKey;
        if (key == null) return error;
        const datosError = {
            minlength: this.minlength + "",
            maxlength: this.maxlength + "",
            min: this.min + "",
            max: this.max + ""
        }[key];
        if (datosError == null) return error;
        return `${error} (${datosError})`;
    }
}
/** Opción de autocompletado */
export interface InputFieldAutocompleteOption {
    value: string | null;
    label?: string | null;
}
/** Datos enviados para solicitar autocompletado remoto */
export interface SearchAutocompleteData {
    searchValue: string;
}
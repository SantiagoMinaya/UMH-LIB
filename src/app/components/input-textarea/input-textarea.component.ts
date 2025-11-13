/**
 * @fileoverview input-textarea component
 * @see {@link ./input-textarea.md} Documentación completa
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
/**
 * Componente TextArea avanzado con soporte para:
 * - ControlValueAccessor
 * - Validaciones
 * - Autocomplete con plantilla personalizada
 * - Contador de caracteres
 */
@Component({
    selector: 'app-input-textarea',
    standalone: true,
    imports: [NzFormModule, NzInputModule, TranslateModule, NzAutocompleteModule, CommonModule, FormsModule, NzIconModule, ExtensionsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputTextAreaComponent),
            multi: true,
        },
    ],
    template: `
        <nz-form-item class="form-item-textarea">
            <nz-form-label *ngIf="label" [nzFor]="name" [nzRequired]="isRequired">
                {{ label }}
            </nz-form-label>
            <nz-form-control [nzValidateStatus]="validateStatus">
                <nz-input-group [nzPrefix]="prefix ?? ''" [nzSuffix]="sufix ?? ''" [ngStyle]="(prefix != null || sufix != null) ? {'padding': '0 20px'} : null">
                    <textarea nz-input
                        [ngModel]="value"
                        (ngModelChange)="handleInput($event)"
                        [attr.name]="name"
                        [id]="name"
                        [rows]="rows"
                        [placeholder]="placeholder"
                        [disabled]="disabled"
                        [attr.maxlength]="maxlength"
                        [nzAutocomplete]="auto">
                    </textarea>
                </nz-input-group>
                <div class="textarea-info">
                    <span class="counter" *ngIf="showCharacterCount">
                        {{ (value?.length ?? 0) }}/{{ maxlength }}
                    </span>
                    <span [class.visible]="!!errorMessage" class="error ant-form-item-explain-error">
                        {{ parsearError(errorMessage??'' | translate) }}
                    </span>
                </div>
                <nz-autocomplete #auto>
                    <ng-container *ngIf="!autocompleteLoadingOptions; else loadingTpl">
                        <nz-auto-option *ngFor="let option of autocompleteOptions" [nzValue]="option.value">
                            <ng-container *ngIf="!autocompleteTemplate; else customTemplate">
                                {{ option.label ?? option.value }}
                            </ng-container>
                            <ng-template #customTemplate>
                                <ng-container *ngTemplateOutlet="autocompleteTemplate; context: { $implicit: option }"></ng-container>
                            </ng-template>
                        </nz-auto-option>
                    </ng-container>
                    <ng-template #loadingTpl>
                        <nz-auto-option [nzDisabled]="true">
                            <nz-icon nzType="loading" nzSpin></nz-icon> {{ '$$$_cargando_$$$' | translate }}
                        </nz-auto-option>
                    </ng-template>
                </nz-autocomplete>
            </nz-form-control>
        </nz-form-item>
    `,
    styles: [`
        .form-item-textarea {
            margin: auto;
        }
        .textarea-info {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row-reverse;
            min-height: 22px;
            .error {
                flex: 1 1 200px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s ease;
            }
            .error.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .counter {
                text-align: right;
            }
        }
    `]
})
export class InputTextAreaComponent implements ControlValueAccessor, OnInit {
    /** Errores por defecto del componente */
    private defaultErrors: { [key: string]: string } = {
        required: '$$$_err_requerido_$$$',
        minlength: '$$$_no_llega_tam_minimo_de_caracteres_$$$',
        maxlength: '$$$_supera_tam_maximo_de_caracteres_$$$',
        pattern: '$$$_formato_erroneo_$$$',
        invalidUrl: '$$$_url_invalida_$$$',
    };
    //*********************************
    // EVENTOS
    //*********************************
    /** Evento emitido cuando cambia el valor */
    @Output() valueChange: EventEmitter<string | null> = new EventEmitter<string | null>();
    //*********************************
    // INPUTS
    //*********************************
    /** Etiqueta del textarea */
    @Input() label: string = '';
    /** Nombre del control */
    @Input() name: string = '';
    /** Placeholder */
    @Input() placeholder: string = '';
    /** Número de filas */
    @Input() rows: number = 4;
    /** Prefijo opcional */
    @Input() prefix: string | TemplateRef<void> | null = null;
    /** Sufijo opcional */
    @Input() sufix: string | TemplateRef<void> | null = null;
    /** Mostrar contador de caracteres */
    @Input() showCharacterCount: boolean = true;
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
    /** Opciones para autocomplete */
    @Input() autocompleteOptions: InputTextAreaAutocompleteOption[] | null = null;
    /** Plantilla personalizada para autocomplete */
    @Input() autocompleteTemplate: TemplateRef<{ $implicit: InputTextAreaAutocompleteOption }> | null = null;
    /** Flag de carga de opciones */
    @Input() autocompleteLoadingOptions: boolean = false;
    //*********************************
    // ESTADO DEL CONTROL
    //*********************************
    /** Valor actual */
    value: string | null = '';
    /** Control deshabilitado */
    disabled = false;
    /** Referencia al NgControl */
    ngControl: NgControl | null = null;
    //*********************************
    // CONSTRUCTOR E INICIALIZACIÓN
    //*********************************
    constructor(@Inject(INJECTOR) private readonly _injector: Injector) {}
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
    /** Indica si el control es requerido */
    get isRequired(): boolean {
        return this.ngControl?.control?.isControlRequired?.() ?? false;
    }
    /** Maxlength del control */
    get maxlength(): number {
        return this.ngControl?.control?.controlMaxLength?.() ?? Number.MAX_SAFE_INTEGER;
    }
    /** Minlength del control */
    get minlength(): number {
        return this.ngControl?.control?.controlMinLength?.() ?? 0;
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
    /** Estado de validación del control para NzFormControl */
    get validateStatus(): 'success' | 'error' | 'warning' | 'validating' | '' {
        const control = this.ngControl?.control;
        if (!control) return 'success';
        if (control.touched && control.invalid) return 'error';
        if (control.touched && control.valid) return 'success';
        return '';
    }
    //*********************************
    // CONTROL VALUE ACCESSOR
    //*********************************
    onChange = (value: any) => {};
    onTouched = () => {};
    writeValue(value: string | null): void {
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
    /** Maneja el cambio de valor desde el textarea */
    handleInput(value: string | null): void {
        this.value = value;
        this.onChange(this.value);
        this.onTouched();
        this.valueChange.emit(this.value);
    }
    //*********************************
    // MÉTODOS AUXILIARES
    //*********************************
    /**
     * Devuelve mensaje de error enriquecido con información de longitud
     * @param error Mensaje de error traducido
     * @returns Mensaje final con detalle de min/max
     */
    parsearError(error: string): string | null {
        const key = this.errorKey;
        if (key == null) return error;
        const datosError = {
            minlength: this.minlength + "",
            maxlength: this.maxlength + ""
        }[key];
        if (datosError == null) return error;
        return `${error} (${datosError})`;
    }
}
/** Interfaz para las opciones de autocomplete del textarea */
export interface InputTextAreaAutocompleteOption {
    value: string | null;
    label?: string | null;
}
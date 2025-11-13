# InputFieldComponent

## Descripción

Componente input-field que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-input-field></app-input-field>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| label | string | - | '' |
| name | string | - | '' |
| placeholder | string | - | '' |
| type | string | - | 'text' |
| prefix | string | TemplateRef<void> | null | - | null |
| sufix | string | TemplateRef<void> | null | - | null |
| autocompleteOptions | InputFieldAutocompleteOption[] | null | - | null |
| autocompleteTemplate | TemplateRef<{ $implicit: InputFieldAutocompleteOption }> | null | - | null |
| autocompleteLoadingOptions | boolean | - | false |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| valueChange | EventEmitter<string> | - |
| loadAutocompleteOptions | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-input-field></app-input-field>
```

### Ejemplo avanzado
```html
<app-input-field
  [label]="valor"
  [name]="valor"
  [placeholder]="valor"
  [type]="valor"
  [prefix]="valor"
  [sufix]="valor"
  [autocompleteOptions]="valor"
  [autocompleteTemplate]="valor"
  [autocompleteLoadingOptions]="valor"
  (valueChange)="manejarValueChange($event)"
  (loadAutocompleteOptions)="manejarLoadAutocompleteOptions($event)">
</app-input-field>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

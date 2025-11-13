# InputTextareaComponent

## Descripción

Componente input-textarea que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-input-textarea></app-input-textarea>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| label | string | - | '' |
| name | string | - | '' |
| placeholder | string | - | '' |
| rows | number | - | 4 |
| prefix | string | TemplateRef<void> | null | - | null |
| sufix | string | TemplateRef<void> | null | - | null |
| showCharacterCount | boolean | - | true |
| autocompleteOptions | InputTextAreaAutocompleteOption[] | null | - | null |
| autocompleteTemplate | TemplateRef<{ $implicit: InputTextAreaAutocompleteOption }> | null | - | null |
| autocompleteLoadingOptions | boolean | - | false |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| valueChange | EventEmitter<string | null> | - |

## Ejemplos

### Ejemplo básico
```html
<app-input-textarea></app-input-textarea>
```

### Ejemplo avanzado
```html
<app-input-textarea
  [label]="valor"
  [name]="valor"
  [placeholder]="valor"
  [rows]="valor"
  [prefix]="valor"
  [sufix]="valor"
  [showCharacterCount]="valor"
  [autocompleteOptions]="valor"
  [autocompleteTemplate]="valor"
  [autocompleteLoadingOptions]="valor"
  (valueChange)="manejarValueChange($event)">
</app-input-textarea>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

# CheckboxComponent

## Descripción

Componente checkbox que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-checkbox></app-checkbox>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| label | string | - | '' |
| disabled | boolean | - | false |
| indeterminate | boolean | - | false |
| size | 'small' | 'default' | 'large' | - | 'default' |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| checkedChange | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-checkbox></app-checkbox>
```

### Ejemplo avanzado
```html
<app-checkbox
  [label]="valor"
  [disabled]="valor"
  [indeterminate]="valor"
  [size]="valor"
  (checkedChange)="manejarCheckedChange($event)">
</app-checkbox>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

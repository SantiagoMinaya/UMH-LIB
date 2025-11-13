# InputCheckboxComponent

## Descripción

Componente input-checkbox que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-input-checkbox></app-input-checkbox>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| label | string | - | '' |
| name | string | - | '' |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| valueChange | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-input-checkbox></app-input-checkbox>
```

### Ejemplo avanzado
```html
<app-input-checkbox
  [label]="valor"
  [name]="valor"
  (valueChange)="manejarValueChange($event)">
</app-input-checkbox>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

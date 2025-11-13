# ButtonComponent

## Descripción

Componente button que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-button></app-button>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| text | string | - | 'Click me' |
| disabled | boolean | - | false |
| variant | 'primary' | 'secondary' | - | 'primary' |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| clicked | EventEmitter | - |
| doubleClicked | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-button></app-button>
```

### Ejemplo avanzado
```html
<app-button
  [text]="valor"
  [disabled]="valor"
  [variant]="valor"
  (clicked)="manejarClicked($event)"
  (doubleClicked)="manejarDoubleClicked($event)">
</app-button>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

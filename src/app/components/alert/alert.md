# AlertComponent

## Descripción

Componente alert que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-alert></app-alert>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| type | 'success' | 'error' | 'warning' | 'info' | - | 'info' |
| title | string | - | '' |
| message | string | - | '' |
| dismissible | boolean | - | true |
| autoClose | boolean | - | false |
| duration | number | - | 5000 |
| showIcon | boolean | - | true |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| closed | EventEmitter | - |
| dismissed | EventEmitter | - |
| actionClicked | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-alert></app-alert>
```

### Ejemplo avanzado
```html
<app-alert
  [type]="valor"
  [title]="valor"
  [message]="valor"
  [dismissible]="valor"
  [autoClose]="valor"
  [duration]="valor"
  [showIcon]="valor"
  (closed)="manejarClosed($event)"
  (dismissed)="manejarDismissed($event)"
  (actionClicked)="manejarActionClicked($event)">
</app-alert>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

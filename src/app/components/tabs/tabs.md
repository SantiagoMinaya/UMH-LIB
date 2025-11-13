# TabsComponent

## Descripción

Componente tabs que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-tabs></app-tabs>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| activeTab | number | - | 0 |
| tabs | string[] | - | [] |
| disabled | boolean | - | false |
| orientation | 'horizontal' | 'vertical' | - | 'horizontal' |
| closable | boolean | - | false |
| animated | boolean | - | true |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| tabChanged | EventEmitter | - |
| tabClosed | EventEmitter | - |
| tabAdded | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-tabs></app-tabs>
```

### Ejemplo avanzado
```html
<app-tabs
  [activeTab]="valor"
  [tabs]="valor"
  [disabled]="valor"
  [orientation]="valor"
  [closable]="valor"
  [animated]="valor"
  (tabChanged)="manejarTabChanged($event)"
  (tabClosed)="manejarTabClosed($event)"
  (tabAdded)="manejarTabAdded($event)">
</app-tabs>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

# IconComponent

## Descripción

Componente icon que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-icon></app-icon>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| name | string | - | 'home' |
| size | number | - | 24 |
| color | string | - | 'currentColor' |
| className | string | - | '' |
| ariaLabel | string | - | '' |
| viewBox | string | - | '0 0 24 24' |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| - | - | - |

## Ejemplos

### Ejemplo básico
```html
<app-icon></app-icon>
```

### Ejemplo avanzado
```html
<app-icon
  [name]="valor"
  [size]="valor"
  [color]="valor"
  [className]="valor"
  [ariaLabel]="valor"
  [viewBox]="valor">
</app-icon>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

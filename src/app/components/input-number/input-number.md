# InputNumberComponent

## Descripción

Componente input-number que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-input-number></app-input-number>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| label | string | - | '' |
| name | string | - | '' |
| placeholder | string | - | '' |
| min | number | null | - | null |
| max | number | null | - | null |
| precision | number | null | - | null |
| step | number | - | 1 |
| disabled | boolean | - | false |
| modo | InputNumberModo | null | - | null |
| formatter | ((value: number | null) => string) | null | - | null |
| parser | ((value: string | null) => number) | null | - | null |
| sufijoMoneda | string | - | '€' |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| - | - | - |

## Ejemplos

### Ejemplo básico
```html
<app-input-number></app-input-number>
```

### Ejemplo avanzado
```html
<app-input-number
  [label]="valor"
  [name]="valor"
  [placeholder]="valor"
  [min]="valor"
  [max]="valor"
  [precision]="valor"
  [step]="valor"
  [disabled]="valor"
  [modo]="valor"
  [formatter]="valor"
  [parser]="valor"
  [sufijoMoneda]="valor">
</app-input-number>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

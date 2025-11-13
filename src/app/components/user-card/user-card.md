# UserCardComponent

## Descripción

Componente user-card que proporciona funcionalidad específica para la aplicación.

## Uso

```html
<app-user-card></app-user-card>
```

## Propiedades

| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| name | string | - | '' |
| email | string | - | '' |
| avatar | string | - | '' |
| user | any | - | {} |
| variant | string | - | 'default' |
| showStatus | boolean | - | true |
| showEmail | boolean | - | true |
| showActions | boolean | - | true |
| showStats | boolean | - | false |
| showFollowButton | boolean | - | false |
| isFollowing | boolean | - | false |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| message | EventEmitter | - |
| call | EventEmitter | - |
| more | EventEmitter | - |
| toggleFollow | EventEmitter | - |

## Ejemplos

### Ejemplo básico
```html
<app-user-card></app-user-card>
```

### Ejemplo avanzado
```html
<app-user-card
  [name]="valor"
  [email]="valor"
  [avatar]="valor"
  [user]="valor"
  [variant]="valor"
  [showStatus]="valor"
  [showEmail]="valor"
  [showActions]="valor"
  [showStats]="valor"
  [showFollowButton]="valor"
  [isFollowing]="valor"
  (message)="manejarMessage($event)"
  (call)="manejarCall($event)"
  (more)="manejarMore($event)"
  (toggleFollow)="manejarToggleFollow($event)">
</app-user-card>
```

## Notas

- Añade aquí cualquier información adicional
- Consideraciones especiales
- Limitaciones conocidas

## Changelog

### v1.0.0
- Versión inicial del componente

# 🧩 OverlayService en Angular - Documentación Técnica

Servicio que permite crear e insertar dinámicamente componentes como modales o diálogos dentro de un contenedor neutro (`OverlayComponent`).

## 📁 Archivo: `overlay.service.ts`

### 📌 Propósito

- Inyecta componentes dinámicos (modales, diálogos, etc.).
- Controla su ciclo de vida.
- Permite cerrar todos los overlays activos.
- Limpia recursos automáticamente en navegación o cierre manual.

---

## 🧠 Propiedades internas

```ts
private activeOverlays: OverlayRef[] = [];
```

- **activeOverlays**: Guarda todas las instancias activas de `OverlayRef`.
- Sirve para cerrar múltiples overlays con `closeAll()` o limpiar uno puntual.

---

## 🧩 Inyección de dependencias

```ts
constructor(
  private appRef: ApplicationRef,
  private injector: Injector,
  private cfr: ComponentFactoryResolver,
  private router: Router
)
```

| Inyectado                  | Propósito                                                   |
| -------------------------- | ----------------------------------------------------------- |
| `ApplicationRef`           | Adjunta o remueve manualmente componentes del DOM.          |
| `Injector`                 | Crea un inyector jerárquico para el overlay y su contenido. |
| `ComponentFactoryResolver` | Crea instancias de componentes dinámicamente.               |
| `Router`                   | Escucha cambios de URL para cerrar overlays al navegar.     |

---

## 🛰 Navegación: cierre automático

```ts
this.router.events.subscribe((event) => {
  if (event instanceof NavigationStart) {
    this.closeAll();
  }
});
```

- Escucha `NavigationStart` y cierra todos los overlays si se cambia la URL.

---

## 🎬 Método principal: `open<T>()`

```ts
open<T>(component: Type<T>, data?: any): OverlayRef
```

### Fases del proceso:

#### 1. Crear `OverlayRef`

```ts
const overlayRef = new OverlayRef(() => {
  this.appRef.detachView(overlayComponentRef.hostView);
  this.removeOverlay(overlayRef);
  overlayComponentRef.destroy();
});
```

- Define cómo se cerrará el overlay.
- Limpia visual y lógicamente la instancia.

#### 2. Crear inyector local

```ts
const overlayInjector = Injector.create({ ... });
```

- Inyecta datos (`OVERLAY_DATA`) y control (`OverlayRef`) al componente hijo.

#### 3. Crear `OverlayComponent`

```ts
const factory = this.cfr.resolveComponentFactory(OverlayComponent);
const overlayComponentRef = factory.create(overlayInjector);
```

#### 4. Insertar en el DOM

```ts
this.appRef.attachView(overlayComponentRef.hostView);
const domElem = ...;
document.body.appendChild(domElem);
```

#### 5. Insertar el componente real dentro del overlay

```ts
setTimeout(() => {
  vcRef.createComponent(contentFactory, undefined, overlayInjector);
});
```

#### 6. Track de overlays abiertos

```ts
this.activeOverlays.push(overlayRef);
```

---

## 🧹 Métodos auxiliares

### `removeOverlay(ref: OverlayRef)`

Elimina un overlay específico del array activo.

### `closeAll()`

Cierra todos los overlays activos, llamando `.close()` a cada uno.

---

## 🧾 Resumen por etapas

| Fase           | Acción                                                                |
| -------------- | --------------------------------------------------------------------- |
| Inicialización | Crea el contenedor `OverlayComponent`.                                |
| Inyección      | Pasa `OverlayRef` y `OVERLAY_DATA` al componente real.                |
| Inserción DOM  | Monta el overlay en el `<body>`.                                      |
| Renderizado    | Inserta dinámicamente el componente real dentro del overlay.          |
| Limpieza       | `.close()` ejecuta `detach`, `destroy` y elimina del array.           |
| Navegación     | `NavigationStart` cierra todos los overlays abiertos automáticamente. |

---



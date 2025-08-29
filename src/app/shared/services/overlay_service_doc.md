# Documentación: Sistema de Overlays en Angular

Este módulo implementa un sistema **dinámico de overlays** en Angular, similar a un servicio global de modales o popups.  
El flujo se compone de cuatro piezas principales:

- `OverlayService` → Orquestador que abre, cierra y limpia overlays.
- `OverlayRef` → Referencia a una instancia abierta (controlador del ciclo de vida).
- `overlay.token.ts` → Tokens de inyección de dependencias para comunicar datos y referencias.
- `OverlayComponent` → Contenedor genérico que hospeda dinámicamente el contenido del overlay.

---

## 1. `overlay.service.ts`

Servicio global que gestiona los overlays.

### Funcionalidades principales:

- **Abrir un overlay** con cualquier componente Angular dinámicamente.
- **Inyectar datos** en el componente cargado mediante `InjectionToken`.
- **Mantener un registro** de overlays activos.
- **Cerrar todos los overlays** cuando se produce una navegación (`NavigationStart`).

### Flujo de `open<T>()`

1. Se crea un `OverlayRef` que expone el método `close()`.
2. Se construye un `Injector` con:
    - `OVERLAY_REF`: referencia al overlay actual.
    - `OVERLAY_DATA`: datos opcionales a inyectar en el componente.
3. Se instancia `OverlayComponent` como **contenedor**.
4. Se adjunta al `document.body`.
5. Dentro del `OverlayComponent`, se inserta dinámicamente el componente solicitado (`component`).
6. Se agrega la instancia a `activeOverlays` para permitir gestión global.

### Método `closeAll()`

Cierra todos los overlays activos en orden LIFO, invocando su `close()`.

---

## 2. `overlay-ref.ts`

Clase que encapsula la **referencia a un overlay abierto**.  
Permite comunicación y control de su ciclo de vida.

### Métodos:

- **`close(result?: T)`**
    - Emite un valor opcional (`result`) cuando se cierra.
    - Llama al callback de cleanup (`closeFn`) provisto por `OverlayService`.
- **`afterClosed(): Observable<T | undefined>`**
    - Permite suscribirse al evento de cierre para obtener el valor de retorno.

Ejemplo de uso:

```ts
const ref = overlayService.open(MyModalComponent, { userId: 123 });

ref.afterClosed().subscribe((result) => {
    console.log('El modal se cerró con:', result);
});
```

export class OverlayRef<T = any> {
  constructor(private closeFn: () => void) {}

  close(): void {
    this.closeFn();
  }
}

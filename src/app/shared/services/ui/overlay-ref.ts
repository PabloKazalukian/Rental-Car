import { Subject, Observable } from 'rxjs';

export class OverlayRef<T = any> {
    private readonly _afterClosed = new Subject<T | undefined>();

    constructor(private closeFn: () => void) { }

    close(result?: T): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
        this.closeFn(); // llama a cleanup
    }

    afterClosed(): Observable<T | undefined> {
        return this._afterClosed.asObservable();
    }
}


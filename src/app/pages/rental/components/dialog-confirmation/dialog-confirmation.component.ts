import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestSend } from 'src/app/core/models/request.interface';
import { RentalService } from 'src/app/core/services/rental.service';
import { DialogComponent } from 'src/app/shared/components/ui/dialog/dialog.component';
import { OverlayService } from 'src/app/shared/services/ui/overlay.service';

@Component({
    selector: 'app-dialog-confirmation',
    templateUrl: './dialog-confirmation.component.html',
    styleUrls: ['./dialog-confirmation.component.css']
})

export class DialogConfirmationComponent implements OnInit, OnDestroy {


    @Input() actions!: TemplateRef<any>;
    @Input() content!: TemplateRef<any>;
    @Input() open: boolean = false;
    @Input() data!: RequestSend & { onConfirm: () => void };
    @Output() closed = new EventEmitter<void>()

    private subscripcions: Subscription[] = [];

    success: boolean = false;
    loading: boolean = false;
    timeout: number = 1800; // tiempo de espera para cerrar el dialogo y redirigir al usuario
    // complete:boolean=false


    constructor(
        private rentalSvc: RentalService,
        private router: Router,
        private overlayService: OverlayService,
    ) { };

    ngOnInit(): void {
        console.log('DialogConfirmationComponent initialized with data:', this.data);
        console.log('Open state:', this.open);
        console.log(this.actions, this.content);
        if (this.open) {


        }
    };

    cancel(): void {
        // this.dialogRef.close('cancelled'); // <- le avisamos al padre que se canceló

    }


    request(): void {
        this.loading = true;
        this.data.state = 'req';
        this.subscripcions.push(
            this.rentalSvc.sendRequest(this.data).subscribe({
                next: (res) => {
                    this.loading = false;
                    this.success = true;
                    this.data.onConfirm();
                    setTimeout(() => {
                        // this.dialogRef.close();
                        this.router.navigate(['/usuario']);
                    }, this.timeout);
                },
                error: (res) => {
                    this.loading = false;
                    this.success = false
                    alert('error');
                }
            })
        );
    };

    confirm(): void {
        this.loading = true;
        this.data.state = 'con';
        this.subscripcions.push(
            this.rentalSvc.sendRequest(this.data).subscribe({
                next: (res) => {
                    this.loading = false;
                    this.success = true;
                    this.data.onConfirm();

                    setTimeout(() => {
                        // this.dialogRef.close();
                        this.router.navigate(['/usuario']);
                    }, this.timeout);
                },
                error: (res) => {
                    this.loading = false;
                    this.success = false;
                    alert('error');
                }
            })
        )
    };
    close(): void {
        this.closed.emit();
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe());
    };

}

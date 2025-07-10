import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestSend } from 'src/app/core/models/request.interface';
import { RentalService } from 'src/app/core/services/rental.service';

@Component({
    selector: 'app-dialog-confirmation',
    templateUrl: './dialog-confirmation.component.html',
    styleUrls: ['./dialog-confirmation.component.css']
})

export class DialogConfirmationComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    success: boolean = false;
    loading: boolean = false;
    timeout: number = 1800; // tiempo de espera para cerrar el dialogo y redirigir al usuario
    // complete:boolean=false


    constructor(
        public dialogRef: MatDialogRef<DialogConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: RequestSend & { onConfirm: () => void },
        private rentalSvc: RentalService,
        private router: Router
    ) { };

    ngOnInit(): void {
    };

    cancel(): void {
        this.dialogRef.close('cancelled'); // <- le avisamos al padre que se canceló
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
                        this.dialogRef.close();
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
                        this.dialogRef.close();
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

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe());
    };

}

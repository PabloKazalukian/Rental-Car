import { Component } from '@angular/core';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/layout/navbar/navbar.component';
import { ToastComponent } from './shared/components/ui/toast/toast.component';
import { ContainerToastComponent } from './shared/components/ui/container-toast/container-toast.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
        NavBarComponent,
        RouterOutlet,
        FooterComponent,
        ContainerToastComponent
    ],
})
export class AppComponent {
    title = 'Rental-Car';
}

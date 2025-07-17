// shared/material.module.ts (puede crearse si querés separar)
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

const MATERIAL_MODULES = [
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class MaterialModule { }

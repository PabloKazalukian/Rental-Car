// shared/material.module.ts (puede crearse si querés separar)
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

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

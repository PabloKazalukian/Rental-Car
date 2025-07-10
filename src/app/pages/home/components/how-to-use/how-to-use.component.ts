import { Component, OnInit } from '@angular/core';

interface diccionary {
    tittle: string,
    text: string,
}

@Component({
    selector: 'app-how-to-use',
    templateUrl: './how-to-use.component.html',
    styleUrls: ['./how-to-use.component.css']
})
export class HowToUseComponent implements OnInit {
    diccionary: diccionary[] = [
        {
            tittle: "Debes iniciar sesión",
            text: `Si no posees una cuenta, puedes registrarte
    <a href="auth/registro">aquí</a>
    muy facilmente, solo necesitas un correo electronico, un usuario y una contraseña.`},
        {
            tittle: "Selecciona tu vehiculo",
            text: `Contamos con varios vechiculos, puede seleccionar cualquiera de ellos para solicitar el alquiler.`
        },
        {
            tittle: "Calendario dinamico",
            text: `Accederas al calendario con las fechas habilitadas de cada vehiculo, debes seleccionar la fecha inicial y final, y puedes confirmar o solicitar.`
        },
        {
            tittle: "Puedes ver tus solicitudes",
            text: `En tu nombre de usuario, alli podras ver tus solicitudes.
    Si no confirmas, puedes cancelar la solicitud antes de la fecha inicial, de lo contrario se confirmara automaticamente.`},
        {
            tittle: "Rental-Car es una Demo",
            text: `No tiene metodos de pago, ni se utiliza para ningun otro proposito la información dada.
    <a mat-raised-button color="warn" href='/contacto' >Dejanos un mensaje</a>`}
    ]


    constructor() { }

    ngOnInit(): void {
    }

}

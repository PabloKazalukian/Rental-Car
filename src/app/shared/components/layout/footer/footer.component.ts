import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
  <footer class="d-flex flex-column justify-content-center align-items-center footer_home">
    <h2>Rental Car</h2>
    <div class="d-flex justify-content-center align-items-center">
        <p> Developed by <a href="https://github.com/PabloKazalukian/Rental-Car" target="_blank" rel="noopener noreferrer">Pablo Kazalukian</a> | Full-Stack-Developer</p>
    </div>
  </footer>
`,
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}

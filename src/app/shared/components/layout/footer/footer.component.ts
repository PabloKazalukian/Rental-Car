import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
  <footer class="footer">
    <h2>Rental Car</h2>
    <div class="footer__content">
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

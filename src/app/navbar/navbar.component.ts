import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  darkMode = false;

  constructor() { }

  ngOnInit() {
    if (localStorage.length > 0) {
      

      localStorage.getItem('darkMode') == 'true' ? this.darkMode = true : this.darkMode = false;
    }
  }

  switchDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());

    window.location.reload();
  }
}

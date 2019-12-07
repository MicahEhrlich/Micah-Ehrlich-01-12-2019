import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'herolo-exam';

  darkMode = false;

  ngOnInit() {
    if (localStorage.length > 0) {
      localStorage.getItem('darkMode') == 'true' ? this.darkMode = true : this.darkMode = false;
    }


  }
}


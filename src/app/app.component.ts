import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pageLogIn';
  constructor(
    private router: Router) {

  
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('currentPage')) {
      sessionStorage.setItem('currentPage', this.router.url);
    }
  }
}




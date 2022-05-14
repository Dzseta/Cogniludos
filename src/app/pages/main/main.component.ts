import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  loggedInUser: boolean = false;
  
  constructor() { }

  ngAfterViewInit() {
    this.loggedInUser = (localStorage.getItem('user') !== 'null');
  }

}

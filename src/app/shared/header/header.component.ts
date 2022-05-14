import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() loggedInUser?: firebase.default.User | null;
  @Input() premiumUser?: boolean | null;
  @Input() adminUser?: boolean | null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { 
  }

  logout(logout?: boolean) {
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }

}

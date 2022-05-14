import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cogniludos';
  loggedInUser?: firebase.default.User | null;
  premiumUser?: boolean | null;
  adminUser?: boolean | null;

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  ngOnInit() { 
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      this.authService.getUserByEmail(this.loggedInUser!.email!).then( data => {
        this.premiumUser = data.docs[0].data().premium;
        this.adminUser = data.docs[0].data().admin;
        localStorage.setItem('premium', JSON.stringify(this.premiumUser));
        localStorage.setItem('admin', JSON.stringify(this.adminUser));
      });
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
      localStorage.setItem('premium', JSON.stringify(false));
      localStorage.setItem('admin', JSON.stringify(false));
    });
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      this.premiumUser = false;
      this.adminUser = false;
    }).catch(error => {
      console.error(error);
    })
  }
}

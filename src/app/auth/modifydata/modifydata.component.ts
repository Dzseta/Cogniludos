import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScoreService } from '../../shared/services/score.service';

@Component({
  selector: 'app-modifydata',
  templateUrl: './modifydata.component.html',
  styleUrls: ['./modifydata.component.css', '../../../../node_modules/ngx-toastr/toastr.css']
})
export class ModifydataComponent implements OnInit {

  minPw = 8;
  modifyForm!: FormGroup;
  currentUserEmail!: string;
  currentUser!: User;
  originalUsername!: string;
  genders = [
    { value:'male', viewValue: 'Férfi'},
    { value:'female', viewValue: 'Nő'},
    { value:'other', viewValue: 'Egyéb'}
  ]; 
  educations = [
    { value:'nothing', viewValue: '-'},
    { value:'primary', viewValue: 'Általános iskola'},
    { value:'vocational', viewValue: 'Szakgimnázium'},
    { value:'secondary', viewValue: 'Gimnázium'},
    { value:'collage', viewValue: 'Főiskola (Bsc.)'},
    { value:'university', viewValue: 'Egyetem (Msc.)'},
    { value:'phd', viewValue: 'PhD.'}
  ]; 
  // premium
  missingGames!: number;
  games = [
    { name:'Memória Mátrix', code: 'mm', missing: 10},
    { name:'Gyors Párosítás', code: 'sm', missing: 10},
    { name:'Kakukktojás', code: 'ooo', missing: 10},
    { name:'Szín Párosítás', code: 'cm', missing: 10},
    { name:'Sorozat', code: 'sq', missing: 10},
    { name:'Folytonosság', code: 'co', missing: 10},
    { name:'Krétatábla', code: 'cb', missing: 10}
  ]; 
  premiumUser!: string;

  constructor(private router: Router, private authService: AuthService, private scoreService: ScoreService, private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUserEmail = JSON.parse(localStorage.getItem('user')!).email;
    this.premiumUser = JSON.parse(localStorage.getItem('premium') as string);
    this.authService.getUserByEmail(this.currentUserEmail).then( data => {
      this.currentUser = data.docs[0].data();
      this.originalUsername = this.currentUser.username;
    });
    this.modifyForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required])
    });
    // calculate missing games
    this.missingGames = 0;
    for (let i=0; i<this.games.length; i++) {
      this.scoreService.getAllScores(this.currentUserEmail, this.games[i].code).then(scores =>{
        this.games[i].missing -= scores.docs.length;
        if (this.games[i].missing < 0) this.games[i].missing = 0; 
        this.missingGames += this.games[i].missing;
      });
    }
    
  }

  ngAfterViewInit() {
    setTimeout(() =>{
      this.modifyForm.get('username')?.setValue(this.currentUser.username);
      this.modifyForm.get('date')?.setValue(this.currentUser.birthdate);
      this.modifyForm.get('gender')?.setValue(this.currentUser.gender);
      this.modifyForm.get('education')?.setValue(this.currentUser.education);
    },1000);
  }

  onSubmit() {
    if (!this.validateForm()) return;
    let user = { username: this.modifyForm.get('username')?.value, email: this.currentUserEmail, birthdate: this.modifyForm.get('date')?.value, gender: this.modifyForm.get('gender')?.value, education: this.modifyForm.get('education')?.value};
    this.authService.userExists(user).then( data => { 
      if (data.empty || user.username == this.originalUsername) {
        this.authService.update(user).then(cred => {
          this.toastr.success('', 'Sikeres adatváltoztatás!', {positionClass: 'toast-bottom-center'});
        }).catch(error => {
          console.error(error);
        }); 
      } else {
        this.modifyForm.get('username')!.setErrors({'usedUsername': true});
      }
    });
    this.authService.update(user);
  }

  validateForm() {
    var valid = true;

    valid = valid && this.modifyForm.get('username')!.valid;
    valid = valid && this.modifyForm.get('date')!.valid;
    valid = valid && this.modifyForm.get('gender')!.valid;
    valid = valid && this.modifyForm.get('education')!.valid;
    return valid;
  }

  getPremium() {
    if (this.missingGames === 0) {
      localStorage.setItem('premium', JSON.stringify(true));
      this.premiumUser = JSON.parse(localStorage.getItem('premium') as string);
      this.currentUser.premium = true;
      this.authService.update(this.currentUser).then(cred => {
        this.toastr.success('', 'Sikeres profilfejlesztés!', {positionClass: 'toast-bottom-center'});
      }).catch(error => {
        console.error(error);
      }); 
    }
  }
}

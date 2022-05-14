import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  minPw = 8;
  signupForm!: FormGroup;
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
  
  constructor(private router: Router, private authService: AuthService) {  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minPw)]),
      passwordRe: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      terms: new FormControl('', [Validators.required])
    });
    this.signupForm.addValidators([this.passwordMatchValidator]);
  }

  onSubmit() {
    if (!this.validateForm()) return;
    let user = { username: this.signupForm.get('username')?.value, email: this.signupForm.get('email')?.value, birthdate: this.signupForm.get('date')?.value, gender: this.signupForm.get('gender')?.value, education: this.signupForm.get('education')?.value, premium: false, admin: false };
    this.authService.userExists(user).then( data => { 
      if (data.empty) {
        this.authService.getUserByEmail(user.email).then( data => {
          if (data.empty) {
              this.authService.signup(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value, user).then(cred => {
              this.router.navigateByUrl('/main');
            }).catch(error => {
              console.error(error);
            });
          } else {
            this.signupForm.get('email')!.setErrors({'usedEmail': true});
          }
        })
      } else {
        this.signupForm.get('username')!.setErrors({'usedUsername': true});
      }
    });
  }
  
  onPasswordInput() {
    if (this.signupForm.hasError('passwordMismatch')) {
        this.signupForm.get('passwordRe')!.setErrors({'passwordMismatch': true});
    } else {
        this.signupForm.get('passwordRe')!.setErrors(null);
    }
  }

  public passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    return this.signupForm.get('password')!.value === this.signupForm.get('passwordRe')!.value ?
      null : { 'passwordMismatch': true };
  };

  validateForm() {
    var valid = true;

    valid = valid && this.signupForm.get('username')!.valid;
    valid = valid && this.signupForm.get('email')!.valid;
    valid = valid && this.signupForm.get('password')!.valid;
    valid = valid && this.signupForm.get('passwordRe')!.valid;
    valid = valid && this.signupForm.get('date')!.valid;
    valid = valid && this.signupForm.get('gender')!.valid;
    valid = valid && this.signupForm.get('education')!.valid;
    valid = valid && this.signupForm.get('terms')!.valid;
    return valid;
  }
}
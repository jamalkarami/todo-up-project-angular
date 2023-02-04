import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { User } from './../../../model/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private mAuthService : AuthService,
    private mRouter : Router) {}

  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.minLength(4), Validators.required]),
  });

  onSubmit(){
    let user = new User();
    user.firstName = this.signupForm.get('firstName')?.value || '';
    user.lastName = this.signupForm.get('lastName')?.value || '';
    user.email = this.signupForm.get('email')?.value || '';
    user.password = this.signupForm.get('password')?.value || '';
    
    console.log("login");    
    this.mAuthService.signup(user).pipe(first()).subscribe(data=>{
      console.log('success', data);     
       
      this.mAuthService.user = data.user;
      this.mAuthService.token = data.token;
      this.mRouter.navigate(['tasks']);
    },error=>{      
      console.log(error);              
      Swal.fire({
        icon: 'error',
        title: 'Authentification error',
        text: error.error || 'Error when accessing to server',      
      })
    })
  }
}
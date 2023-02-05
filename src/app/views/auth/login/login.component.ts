import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  

  constructor(private mAuthService : AuthService,
    private mRouter : Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(4))
  });

  onSubmit(){
    let email = this.loginForm.get('email')?.value || '';
    let password = this.loginForm.get('password')?.value || '';
    console.log("login");    
    this.mAuthService.login(email, password).pipe(first()).subscribe(data=>{
      console.log('success', data);     
       
      this.mAuthService.user = data.user;
      this.mAuthService.token = data.token;
      this.mRouter.navigate(['tasks']);
    },error=>{     
      console.log(error);
               
      Swal.fire({
        icon: 'error',
        title: 'Authentification error',
        text: error.error || 'User not found',      
      })
    })
  }
}

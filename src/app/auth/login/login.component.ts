import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;
  loading: any;
  returnUrl: string;

  constructor(public authService: AuthService, private fb: FormBuilder,
    private toastrService: ToastrService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }
  
  // Login With Google
  // loginGoogle() {
  //   this.authService.GoogleAuth();
  // }

  // // Login With Twitter
  // loginTwitter(): void {
  //   this.authService.signInTwitter();
  // }

  // // Login With Facebook
  // loginFacebook() {
  //   this.authService.signInFacebok();
  // }

  // Simple Login
  // login() {
    
  //   this.authService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']);
  // }

  get f() {
    return this.loginForm.controls;
  }

  login(){

      // this.submitted = true;
      // if(this.loginForm.invalid){
      //   return;
      // }

      this.loading=true;
      this.authService.SignIn(this.f['email'].value,this.f['password'].value).subscribe(
        (data:any) =>{
            if(data.username){
            
              localStorage.setItem('user',JSON.stringify(data.username));
              this.toastrService.success('Login Successfully')
              this.router.navigate(['/dashboard/default']);
            }else{
              this.loading = false;
              this.toastrService.error(data.username)
            }
        }
      )
    }
}

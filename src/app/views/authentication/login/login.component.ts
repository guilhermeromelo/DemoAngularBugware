import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup = Object.create(null);
  loading = false;
  errorMessage = "";

  constructor(private route: Router) {
    this.loginForm = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'rememberUser': new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    let localStorageUser: any = JSON.parse(<string>localStorage.getItem('loggedUser2'));
    if (localStorageUser != null && localStorageUser != "null") {
      if (localStorageUser.rememberUser == true) {
        this.loginForm.patchValue({
          'login': localStorageUser.userName,
          'rememberUser': true
        });
      }
    }
  }

  async login() {
    this.route.navigateByUrl('/account');
  }
}

export interface loginInterface {
  ulogin: string,
  upassword: string
}
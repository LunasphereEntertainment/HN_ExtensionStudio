import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserAccount } from '../auth.models';
import { Router } from '@angular/router';

@Component({
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    errMsg: string = "";

    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    })

    constructor(private service: AuthService, private router: Router) {
        if (this.isAuthenticated()) {
            this.router.navigate(['home'])
        }
    }

    clearError() {
        this.errMsg = "";
    }

    isAuthenticated() {
        return localStorage.getItem('auth') !== null;
    }

    login() {
        let user = new UserAccount(this.loginForm.get('username').value, this.loginForm.get('password').value);

        this.service.login(user).subscribe(res => {
            console.log(res);

            if (res.token) {
                localStorage.setItem("auth", res.token);
                this.router.navigate(['selector']);
            }
        });
    }
}
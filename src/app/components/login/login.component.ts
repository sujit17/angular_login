import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.getAllUsers();
  }

  rootURL = 'https://dummyjson.com/';
  getUsers(url: string) {
    return this.http.get(this.rootURL + url);
  }

  destroys$: Subject<boolean> = new Subject<boolean>();
  loginUser = localStorage.getItem('userLogin');

  getAllUsers() {
    this.getUsers(`users`)
      .pipe(takeUntil(this.destroys$))
      .subscribe((user: Object) => {
        localStorage.setItem('userData', JSON.stringify(user));
      });
  }

  // atuny0@sohu.com 9uQFF1Lh
  onLogin() {
    let userData: any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    userData = userData?.users;
    const dta = userData.map((ele: { email: any; password: any; }) => {
      return { email: ele.email, password: ele.password };
    });
    console.log("dta-> ", dta);
    
    if (
      userData.find(
        (user: { email: any; password: any }) =>
          user.email == this.form.value.email &&
          user.password === this.form.value.password
      )
    ) {
      localStorage.setItem('userLogin', this.form.value.email);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login Failed!, Please try again.');
      this.form.reset();
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('userLogin')) this.router.navigate(['/dashboard']);
  }
}

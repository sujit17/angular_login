import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  users: any;
  searchForm: FormGroup = this.fb.group({
    searchVal: '',
  });
  page: number = 1;

  constructor(private fb: FormBuilder) {
    let userData: any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    userData = userData?.users;
    this.users = userData;
  }

  search() {
    if (this.searchForm.value.searchVal === '') {
      let userData: any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      userData = userData?.users;
      this.users = userData;
    } else {
      this.users = this.users.filter(
        (res: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
        }) => {
          return (
            res.firstName
              .toLocaleLowerCase()
              .match(this.searchForm.value.searchVal.toLocaleLowerCase()) ||
            res.lastName
              .toLocaleLowerCase()
              .match(this.searchForm.value.searchVal.toLocaleLowerCase()) ||
            res.email
              .toLocaleLowerCase()
              .match(this.searchForm.value.searchVal.toLocaleLowerCase()) ||
            res.phone
              .toLocaleLowerCase()
              .match(this.searchForm.value.searchVal.toLocaleLowerCase())
          );
        }
      );
    }
  }
}

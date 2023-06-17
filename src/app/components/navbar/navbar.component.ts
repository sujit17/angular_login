import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  isUser: boolean = false;


  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (
          localStorage.getItem('userLogin') &&
          val.url.includes('/dashboard')
        ) {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    // window.location.reload();
  }
}

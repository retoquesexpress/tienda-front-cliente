import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../../datos/Services/s-login';

@Component({
  selector: 'c-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './c-header.html',
  styleUrl: './c-header.scss',
})
export class CHeader implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isRegistered();

    this.loginService.isLogged$.subscribe(logged => {
      this.isLoggedIn = logged;
    });
  }

  logout(): void {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}

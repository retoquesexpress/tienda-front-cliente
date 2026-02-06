import { Component, inject, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
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
  showUserMenu: boolean = false;
  userName: string | null = null;

  //Para que se quite el menu cuando haces click fuera
  @ViewChild('userMenuContainer') userMenuContainer!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.showUserMenu && this.userMenuContainer && !this.userMenuContainer.nativeElement.contains(event.target)) {
      this.showUserMenu = false;
    }
  }
  //Fin de eso

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isRegistered();
    if (this.isLoggedIn) {
      this.userName = this.loginService.getUserName();
    }

    this.loginService.isLogged$.subscribe(logged => {
      this.isLoggedIn = logged;
      if (logged) {
        this.userName = this.loginService.getUserName();
      } else {
        this.userName = null;
        this.showUserMenu = false;
      }
    });


  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.loginService.logOut();
    this.showUserMenu = false;
    this.router.navigate(['/login']);
  }
}

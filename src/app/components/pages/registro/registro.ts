import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../datos/Services/s-login';

@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './registro.html',
    styleUrl: './registro.scss'
})
export class RegistroComponent {
    router = inject(Router);
    loginService = inject(LoginService);

    registerData = {
        name: '',
        email: '',
        userName: '',
        password: '',
        phoneNumber: '',
        address: '',
        birthDate: ''
    };

    maxDate: string = new Date().toISOString().split('T')[0];
    errorMessage: string | null = null;

    register() {
        this.errorMessage = null;

        if (!this.registerData.name || !this.registerData.email || !this.registerData.userName || !this.registerData.password) {
            this.errorMessage = 'Por favor, rellena todos los campos obligatorios';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.registerData.email)) {
            this.errorMessage = 'Por favor, introduce un correo electrónico válido';
            return;
        }

        if (this.registerData.birthDate > this.maxDate) {
            this.errorMessage = 'La fecha de nacimiento no puede ser futura.';
            return;
        }

        console.log('Datos de registro:', this.registerData);
        this.loginService.register(this.registerData).subscribe({
            next: (response) => {
                console.log('Registro exitoso', response);
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Error en el registro', error);
                this.errorMessage = 'Error en el registro: ' + (error.error || 'Desconocido');
            }
        });
    }
}

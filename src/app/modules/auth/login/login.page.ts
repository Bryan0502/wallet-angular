import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.initializeForm();
  }

  ngOnInit() {

    const username = localStorage.getItem('username');
    if (username) {
      // Si el username existe en localStorage, redirige a la página de inicio
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  private initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      try {
        // Llama al método de login del servicio
        const user = await this.authService.login(username, password);

        if (user) {
          // Si el login fue exitoso, guarda el userId en el localStorage
          localStorage.setItem('username', user.name);
          localStorage.setItem('userid', user.userId);

          // Limpiar los campos antes de navegar
          this.loginForm.get('username')?.setValue('');
          this.loginForm.get('password')?.setValue('');

          await this.showToast('success-toast','Inicio de Sesión Correcto'); // Muestra el toast de éxito
          
          // Navega a la página de inicio después del login
          this.router.navigate(['/home']);
        } else {
          // Maneja el error aquí, mostrando un mensaje de error
          console.log('Login failed');
          await this.showToast('error-toast','Credenciales Incorrectas'); // Muestra el toast de error
        }
      } catch (error) {
        // Maneja errores de red o inesperados
        console.error('Login error:', error);
        await this.showToast('error-toast','Error de Inicio de Sesión'); // Muestra el toast de error
      }
    }
  }

  async showToast(toastId: string, message: string) {
    // Crear el toast con el mensaje proporcionado
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: toastId === 'success-toast' ? 'success' : 'danger',
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  
}

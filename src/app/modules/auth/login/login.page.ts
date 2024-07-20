import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Aquí puedes manejar la lógica de autenticación
      console.log('Login successful:', this.loginForm.value);

      // Guardar el nombre de usuario en el almacenamiento local
      const username = this.loginForm.get('username')?.value;
      localStorage.setItem('username', username);

      // Limpiar los campos antes de navegar
      this.loginForm.get('username')?.setValue('');
      this.loginForm.get('password')?.setValue('');

      this.router.navigate(['/home']); // Navega a la página de inicio después del login
    }
  }
}

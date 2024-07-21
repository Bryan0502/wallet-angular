import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {

  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserName();
  }

  loadUserName() {
    const storedUserName = localStorage.getItem('username');
    this.username = storedUserName ? storedUserName : 'John Doe'; // Valor predeterminado si no hay nombre en localStorage
  }

  logout() {
    // Elimina el username del localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('userid');

    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

}

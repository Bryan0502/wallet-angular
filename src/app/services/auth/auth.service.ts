import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseUrl = 'https://reto-front-angular-default-rtdb.firebaseio.com/users.json';

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<{ userId: string, name: string } | null> {
    try {
      const users = await this.http.get<{ [key: string]: any }>(this.firebaseUrl).toPromise();
      const userEntry = Object.entries(users).find(([key, value]) => 
        value.email === username && value.password === password
      );

      if (userEntry) {
        // Asumiendo que cada usuario tiene un campo "name" junto con "email" y "password"
        const userId = userEntry[0]; // La clave de Firebase para el usuario
        const name = userEntry[1].name; // El nombre del usuario
        return { userId, name }; // Devuelve tanto el userId como el name
      } else {
        return null; // No se encontró el usuario o las credenciales no coinciden
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      return null;
    }
  }
}
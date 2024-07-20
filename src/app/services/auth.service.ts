import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      return user ? user.uid : null; // Devuelve el userId o null si el usuario no está autenticado
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await this.afAuth.signOut();
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  }
}

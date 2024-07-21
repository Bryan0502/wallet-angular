import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AddAccountService {
  constructor(private db: AngularFireDatabase) { }

  // Método para realizar la transferencia
  createAccount(AccountName: string, userId: string) {
    const min = 100000000000000; // El menor número de 15 dígitos
    const max = 999999999999999; // El mayor número de 15 dígitos
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const accountNumber = randomNumber.toString();

    // Crea el registro de la transferencia
    const accountRef = this.db.list('/accounts').push({
      accountBalance: 0,
      accountName: AccountName,
      accountNumber: accountNumber,
      userId: userId
    });

  }
}
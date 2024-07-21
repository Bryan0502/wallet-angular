import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor(private db: AngularFireDatabase) { }

  // Método para realizar la transferencia
  performTransfer(originAccountKey: string, originAccountName: string, destinationAccountKey: string, destinationAccountName: string,ammount: number, userId: string) {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // Crea el registro de la transferencia
    const transferRef = this.db.list('/transfers').push({
      accountIdOrigin: originAccountKey,
      accountIdOriginName: originAccountName,
      accountIdDestination: destinationAccountKey,
      accountIdDestinationName: destinationAccountName,
      ammount: ammount,
      date: formattedDate,
      userId: userId
    });

    // Actualiza el saldo de la cuenta de origen
    this.db.object(`/accounts/${originAccountKey}`).valueChanges().pipe(take(1)).subscribe((originAccount: any) => {
      if (originAccount) {
        const newBalanceOrigin = originAccount.accountBalance - ammount;
        this.db.object(`/accounts/${originAccountKey}`).update({ accountBalance: newBalanceOrigin });
      }
    });

    // Actualiza el saldo de la cuenta de destino
    this.db.object(`/accounts/${destinationAccountKey}`).valueChanges().pipe(take(1)).subscribe((destinationAccount: any) => {
      if (destinationAccount) {
        const newBalanceDestination = destinationAccount.accountBalance + ammount;
        this.db.object(`/accounts/${destinationAccountKey}`).update({ accountBalance: newBalanceDestination });
      }
    });
  }
}
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from './accounts.model'; // Asegúrate de que la ruta de importación sea correcta

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  accounts$ = this.accountsSubject.asObservable();

  constructor(private db: AngularFireDatabase) { }

  getAccountsByUserId(userId: string) {
    this.db.list('/accounts', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(changes => 
          changes.map(c => {
            const data = c.payload.val() as Account;
            return { ...data, key: c.payload.key }; // Asegura que `key` se asigne después y no se sobrescriba
          })
        )
      )
      .subscribe(accounts => this.accountsSubject.next(accounts));
  }
}
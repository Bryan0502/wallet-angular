import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Transfer } from './transfers.model'; // Asegúrate de que la ruta de importación sea correcta

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(private db: AngularFireDatabase) { }

  getTransfersByUserId(userId: string) {
    return this.db.list('/transfers', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(changes => 
          changes.map(c => {
            const data = c.payload.val() as Transfer;
            return { ...data, key: c.payload.key }; // Asegura que `key` se asigne después y no se sobrescriba
          })
        )
      );
  }
}
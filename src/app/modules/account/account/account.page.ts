import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../services/account/accounts.service'; // Ajusta la ruta según sea necesario
import { Account } from '../../../services/account/accounts.model'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  accounts: Account[] = []; // Almacena todas las cuentas
  displayedAccounts: Account[] = []; // Almacena las cuentas que se muestran actualmente
  batchSize: number = 10; // Define el tamaño del lote

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    const userId = localStorage.getItem('userid');
    if (userId === null) {
      // Manejar el caso en que userId es null
      console.error('No se encontró el userId en localStorage.');
      // Aquí podrías redirigir al usuario o mostrar un mensaje
    } else {
      this.accountsService.getAccountsByUserId(userId).subscribe(accounts => {
        this.accounts = accounts;
        this.displayedAccounts = this.accounts.slice(0, this.batchSize);
      });
    }
  }

  loadMore(event: any) {
    setTimeout(() => {
      const nextBatch = this.accounts.slice(this.displayedAccounts.length, this.displayedAccounts.length + this.batchSize);
      this.displayedAccounts = [...this.displayedAccounts, ...nextBatch];

      event.target.complete();

      if (this.displayedAccounts.length >= this.accounts.length) {
        event.target.disabled = true;
      }
    }, 500); // Simula un retraso en la carga
  }
}

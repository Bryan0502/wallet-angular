import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../services/account/accounts.service'; // Ajusta la ruta según sea necesario
import { Account } from '../../../services/account/accounts.model'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  accounts: Account[] = []; // Almacena las cuentas aquí

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
      });
    }
  }

}

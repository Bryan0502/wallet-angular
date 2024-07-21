import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from '../../../services/account/accounts.service'; // Ajusta la ruta según sea necesario
import { TransferService } from '../../../services/transfer/transfer.service';
import { Account } from '../../../services/account/accounts.model'; // Ajusta la ruta según sea necesario
import { ToastController, IonSelect } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  accounts: Account[] = [];
  originAccountKey: string | null = null;
  destinationAccountKey: string | null = null;
  originAccountBalance: number = 0;
  ammount: number = 0;

  @ViewChild('originSelect') originSelect: IonSelect | undefined;
  @ViewChild('destinationSelect') destinationSelect: IonSelect | undefined;

  constructor(
    private accountsService: AccountsService,
    private transferService: TransferService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.accountsService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  onOriginAccountChange(event: any) {
    this.originAccountKey = event.detail.value;
    const selectedAccount = this.accounts.find(account => account.key === this.originAccountKey);
    if (selectedAccount) {
      this.originAccountBalance = selectedAccount.accountBalance;
    } else {
      this.originAccountBalance = 0;
    }
    this.validateAccountSelection();
  }

  onDestinationAccountChange(event: any) {
    this.destinationAccountKey = event.detail.value;
    this.validateAccountSelection();
  }

  validateAccountSelection() {
    if (this.originAccountKey && this.destinationAccountKey && this.originAccountKey === this.destinationAccountKey) {
      // Mostrar un mensaje de advertencia si las cuentas de origen y destino son iguales
      this.showToast('error-toast','La cuenta de origen y la cuenta de destino no pueden ser la misma.'); // Muestra el toast de error

      // Restablece la cuenta de destino a null
      this.destinationAccountKey = null;
      if (this.destinationSelect) {
        this.destinationSelect.value = null; // Deseleccionar manualmente
      }
    }
  }

  async transfer() {
    if (this.originAccountKey && this.destinationAccountKey && this.ammount > 0) {
      if (this.ammount > this.originAccountBalance) {
        // Mostrar un mensaje de error si el monto a transferir excede el saldo disponible
        this.showToast('error-toast','La cantidad a transferir excede el saldo disponible.'); // Muestra el toast de error
      } else {
        try {
          const originAccount = this.accounts.find(account => account.key === this.originAccountKey);
          const destinationAccount = this.accounts.find(account => account.key === this.destinationAccountKey);

          // Extraer los nombres de las cuentas
          const originAccountName = originAccount ? originAccount.accountName : '';
          const destinationAccountName = destinationAccount ? destinationAccount.accountName : '';
          const userId = localStorage.getItem('userid') || '';

          await this.transferService.performTransfer(this.originAccountKey, originAccountName, this.destinationAccountKey, destinationAccountName, this.ammount, userId);

          this.originAccountKey = null;
          this.destinationAccountKey = null;
          this.ammount = 0;
          this.originAccountBalance = 0;

          if (this.originSelect) {
            this.originSelect.value = null;
          }
          if (this.destinationSelect) {
            this.destinationSelect.value = null;
          }

          this.showToast('success-toast','Transferencia exitosa.');
          this.router.navigate(['/home']);
        } catch (error) {
          this.showToast('error-toast', 'Error al realizar la transferencia.');
        }
      }
    } 
    else if (this.originAccountKey && this.destinationAccountKey && this.originAccountKey === this.destinationAccountKey) {
      // Mostrar mensaje de error si las cuentas de origen y destino son iguales
      this.showToast('error-toast','La cuenta de origen y la cuenta de destino no pueden ser la misma.'); // Muestra el toast de error
    }
    else if (this.originAccountKey && this.destinationAccountKey && this.ammount === 0) {
      this.showToast('error-toast','El monto a transferir debe ser mayor a 0.'); // Muestra el toast de error
    }
    else {
      this.showToast('error-toast','Por favor, seleccione una cuenta de origen, una cuenta de destino y un monto válido.'); // Muestra el toast de error
    }
  }

  async showToast(toastId: string, message: string) {
    // Crear el toast con el mensaje proporcionado
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: toastId === 'success-toast' ? 'success' : 'danger',
      position: toastId === 'success-toast' ? 'bottom' : 'middle',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}

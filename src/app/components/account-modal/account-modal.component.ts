import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent {
  accountName: string = '';

  constructor(private modalController: ModalController) { }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async saveAccount() {
    await this.modalController.dismiss(this.accountName);
  }
}

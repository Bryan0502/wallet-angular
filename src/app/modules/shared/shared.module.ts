// src/app/shared/shared.module.ts
import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { AccountCardComponent } from 'src/app/components/account-card/account-card.component';
import { TransferCardComponent } from 'src/app/components/transfer-card/transfer-card.component';
import { AccountModalComponent } from 'src/app/components/account-modal/account-modal.component';	

@NgModule({
  declarations: [SessionCardComponent, AccountCardComponent, TransferCardComponent, AccountModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [SessionCardComponent, AccountCardComponent, TransferCardComponent, AccountModalComponent],
})
export class SharedModule {}

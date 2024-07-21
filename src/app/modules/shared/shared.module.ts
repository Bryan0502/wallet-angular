// src/app/shared/shared.module.ts
import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { AccountCardComponent } from 'src/app/components/account-card/account-card.component';
import { TransferCardComponent } from 'src/app/components/transfer-card/transfer-card.component';

@NgModule({
  declarations: [SessionCardComponent, AccountCardComponent, TransferCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SessionCardComponent, AccountCardComponent, TransferCardComponent],
})
export class SharedModule {}

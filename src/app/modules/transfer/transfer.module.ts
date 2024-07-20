import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransferPageRoutingModule } from './transfer/transfer-routing.module';
import { TransferPage } from './transfer/transfer.page';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TransferPageRoutingModule,
    SharedModule
  ],
  declarations: [TransferPage]
})
export class TransferModule { }

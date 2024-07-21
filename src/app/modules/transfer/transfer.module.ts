import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TransferPageRoutingModule } from './transfer/transfer-routing.module';
import { TransferPage } from './transfer/transfer.page';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TransferPageRoutingModule,
    SharedModule
  ],
  declarations: [TransferPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransferModule { }

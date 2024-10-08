import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountPageRoutingModule } from './account/account-routing.module';
import { AccountPage } from './account/account.page';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountPageRoutingModule,
    SharedModule
  ],
  declarations: [AccountPage]
})
export class AccountModule { }

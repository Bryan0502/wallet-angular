// src/app/shared/shared.module.ts
import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { AccountCardComponent } from 'src/app/components/account-card/account-card.component';

@NgModule({
  declarations: [SessionCardComponent, AccountCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SessionCardComponent, AccountCardComponent],
})
export class SharedModule {}

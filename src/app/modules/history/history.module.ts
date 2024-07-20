import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransfersHistoryPage } from './transfers-history/transfers-history.page';
import { TransfersHistoryPageRoutingModule } from './transfers-history/transfers-history-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TransfersHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [TransfersHistoryPage]
})
export class HistoryModule {}

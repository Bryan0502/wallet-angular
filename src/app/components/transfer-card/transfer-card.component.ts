import { Component, Input } from '@angular/core';
import { Transfer } from '../../services/transfers/transfers.model';

@Component({
  selector: 'app-transfer-card',
  templateUrl: './transfer-card.component.html',
  styleUrls: ['./transfer-card.component.scss'],
})
export class TransferCardComponent{

  @Input() transfer?: Transfer;

}

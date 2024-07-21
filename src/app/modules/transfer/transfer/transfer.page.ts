import { Component, OnInit } from '@angular/core';
import { TransfersService } from '../../../services/transfers/transfers.service';
import { Transfer } from '../../../services/transfers/transfers.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  transfers: Transfer[] = []; // Almacena todas las transferencias
  displayedTransfers: Transfer[] = []; // Almacena las transferencias que se muestran actualmente
  batchSize: number = 1; // Define el tamaño del lote

  constructor(private TransfersService: TransfersService) { }

  ngOnInit() {
    const userId = localStorage.getItem('userid');
    if (userId === null) {
      // Manejar el caso en que userId es null
      console.error('No se encontró el userId en localStorage.');
      // Aquí podrías redirigir al usuario o mostrar un mensaje
    } else {
      this.TransfersService.getTransfersByUserId(userId).subscribe(transfers => {
        this.transfers = transfers;
        this.displayedTransfers = this.transfers.slice(0, this.batchSize);
      });
    }
  }

  loadMore(event: any) {
    setTimeout(() => {
      const nextBatch = this.transfers.slice(this.displayedTransfers.length, this.displayedTransfers.length + this.batchSize);
      this.displayedTransfers = [...this.displayedTransfers, ...nextBatch];

      event.target.complete();

      if (this.displayedTransfers.length >= this.transfers.length) {
        event.target.disabled = true;
      }
    }, 500); // Simula un retraso en la carga
  }

}

import { Component, OnInit } from '@angular/core';
import { TransfersService } from '../../../services/transfers/transfers.service';
import { Transfer } from '../../../services/transfers/transfers.model';

@Component({
  selector: 'app-transfers-history',
  templateUrl: './transfers-history.page.html',
  styleUrls: ['./transfers-history.page.scss'],
})
export class TransfersHistoryPage implements OnInit {

  transfers: Transfer[] = []; // Almacena todas las transferencias
  displayedTransfers: Transfer[] = []; // Almacena las transferencias que se muestran actualmente
  batchSize: number = 10; // Define el tamaño del lote

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
      event.target.complete(); // Indica que la operación asincrónica ha finalizado
  
      // Verifica si se han cargado todas las transferencias. Si es así, deshabilita el evento.
      if (this.displayedTransfers.length >= this.transfers.length) {
        event.target.disabled = true; // Deshabilita el evento si no hay más elementos para cargar
      }
    }, 500);
  }

}

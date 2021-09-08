import { Component, OnInit } from '@angular/core';
import {EnviarValorService} from "../../services/enviar-valor.service";

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.scss']
})
export class UnsubscribePocComponent implements OnInit {

  mostrarComponentes = true

  constructor(private enviarValorService: EnviarValorService) { }

  ngOnInit(): void {
  }

  emitirValor(value: string) {
    this.enviarValorService.emitirValor(value)
  }


  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }
}

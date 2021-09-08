import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnviarValorService} from "../../../services/enviar-valor.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base [nome]="nome"
                  [valor]="valor" estilo="bg-danger">
    </app-poc-base>`
})
export class PocComponent implements OnInit, OnDestroy{

  nome = "Componente sem unsubcribed";
  valor: string

  constructor(private enviarValorService: EnviarValorService) {
  }

  ngOnInit(): void {
    this.enviarValorService.getValor()
      .pipe(
        tap(v => console.log(this.nome, v))
      )
      .subscribe(novoValor => this.valor = novoValor)
  }

  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruido`)
  }
}

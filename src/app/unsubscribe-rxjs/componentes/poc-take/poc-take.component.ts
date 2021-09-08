import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnviarValorService} from "../../../services/enviar-valor.service";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [nome]="nome"
                  [valor]="valor" estilo="bg-info">
    </app-poc-base>`
})
export class PocTakeComponent implements OnInit, OnDestroy{

  nome = 'Componente com take';
  valor: string;

  constructor(private enviarValorService: EnviarValorService) {
  }

  ngOnInit(): void {
    this.enviarValorService.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        take(1)
      )
      .subscribe(novoValor => this.valor = novoValor)
  }

  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruido`)
  }
}

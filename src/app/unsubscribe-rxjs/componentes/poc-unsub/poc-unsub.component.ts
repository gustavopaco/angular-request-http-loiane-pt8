import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnviarValorService} from "../../../services/enviar-valor.service";
import {tap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
                  [valor]="valor" estilo="bg-secondary">
    </app-poc-base>`
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente com unsubscribe';
  valor: string;
  sub: Array<Subscription> = [];

  constructor(private enviarValorService: EnviarValorService) {
  }

  ngOnInit(): void {
    this.sub.push(this.enviarValorService.getValor()
      .pipe(
        tap(v => console.log(this.nome, v))
      )
      .subscribe(novoValor => this.valor = novoValor))
  }

  ngOnDestroy(): void {
    this.sub.forEach(item => item.unsubscribe())
    console.log(`${this.nome} foi destruido`)
  }
}

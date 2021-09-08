import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnviarValorService} from "../../../services/enviar-valor.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome"
                  [valor]="valor" estilo="bg-primary">
    </app-poc-base>`
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {

  nome = 'Componente com takeUntil';
  valor: string;
  unsub$ = new Subject()

  constructor(private enviarValorService: EnviarValorService) {
  }

  ngOnInit(): void {
    this.enviarValorService.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        takeUntil(this.unsub$)
      )
      .subscribe(novoValor => this.valor = novoValor)
  }

  ngOnDestroy(): void {
    this.unsub$.next()
    this.unsub$.complete()
    console.log(`${this.nome} foi destruido`)
  }
}

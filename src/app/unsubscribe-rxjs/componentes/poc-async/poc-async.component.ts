import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EnviarValorService} from "../../../services/enviar-valor.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome"
                  [valor]="valor$ | async" estilo="bg-success">
    </app-poc-base>`
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  nome = 'Componente com async';
  valor$: Observable<any>;

  constructor(private enviarValorService: EnviarValorService) {
  }

  ngOnInit(): void {
    this.valor$ = this.enviarValorService.getValor()
      .pipe(
        tap(v => console.log(this.nome, v))
      )
  }

  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruido`)
  }
}

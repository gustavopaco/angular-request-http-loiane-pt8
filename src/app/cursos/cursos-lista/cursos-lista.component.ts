import {Component, OnInit} from '@angular/core';
import {CursosService} from "../../services/cursos.service";
import {Observable, of, Subject} from "rxjs";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Array<Curso>;

  cursos$: Observable<any>
  error$ = new Subject<boolean>();

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    // this.cursosService.list().subscribe(response => this.cursos = response);
    this.onRefresh()
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(erro => {
          console.log(erro);
          this.error$.next(true)
          return of()
        })
      )

    this.cursosService.list()
      .pipe(
        take(1) /* Quantidade de vezes que o observable ira ficar vivo*/
      )
      .subscribe(
      response => console.log(response),
        error => console.log(error),
      () => console.log("Completo"));
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Curso} from "../model/curso";
import {Observable, of} from "rxjs";
import {CursosService} from "./cursos.service";

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private cursoService: CursosService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Curso> | Promise<Curso> | Curso {

    if (route.params && route.params["id"]) {
      return this.cursoService.loadByID(route.params["id"])
    }

    return of({
      id: null,
      nome: null
    })
  }
}

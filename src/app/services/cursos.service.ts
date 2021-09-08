import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Curso} from "../model/curso";
import {environment} from "../../environments/environment";
import {take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Array<Curso>>(this.API)
      .pipe(
        tap(console.log)
      )
  }

  create(curso: any) {
    return this.http.post(this.API, curso).pipe(take(1))
  }

  loadByID(id: any) {
    return this.http.get<Curso>(this.API + `/${id}`).pipe(take(1))
  }

  update(curso: any) {
    return this.http.put(this.API + `/${curso.id}`, curso).pipe(take(1))
  }

  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
      return this.create(curso);
  }

  remove(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }
}

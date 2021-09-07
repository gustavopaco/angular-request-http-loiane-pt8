import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Curso} from "../model/curso";
import {environment} from "../../environments/environment";
import {delay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Array<Curso>>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      )
  }
}

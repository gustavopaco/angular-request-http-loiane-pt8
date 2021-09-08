import { Injectable } from '@angular/core';
import {CrudUtil} from "../shared/crud-util";
import {Curso} from "../model/curso";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrudUtilService extends CrudUtil<Curso>{

  constructor(protected http: HttpClient) {
    super(http,`${environment.API}cursos`);
  }
}

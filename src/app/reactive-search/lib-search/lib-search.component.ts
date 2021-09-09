import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = "https://api.cdnjs.com/libraries";
  results$: Observable<any>;
  total: number

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSearch() {

    const fields = "name,description,version,homepage";
    let value = this.queryField.value;

    if (value && value.trim() !== "") {
      value = value.trim();

      /*Note: Passagem de parametros na URL por objeto*/
      const parametros = {
        search: value,
        fields: fields
      }

      /*Note: Passagem de parametros na URL ?param1=x&param2=y&param3=z*/
      let parametros2 = new HttpParams();
      parametros2 = parametros2.set("search", value);
      parametros2 = parametros2.set("fields", fields);

      /*Note: outro jeito de passar parametro mais primitivo*/
        // `?fields=${fields}&search=${value}`
      this.results$ = this.http.get(this.SEARCH_URL, {params: parametros2})
        .pipe(
          tap((response: any) => this.total = response.total),
          map((response: any) => response.results)
        )
    }
  }
}

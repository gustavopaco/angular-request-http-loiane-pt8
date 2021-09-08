import {HttpClient} from "@angular/common/http";
import {take, tap} from "rxjs/operators";

export class CrudUtil<T> {

  constructor(protected http: HttpClient, private API_URL: string) {
  }

  list() {
    return this.http.get<Array<T>>(this.API_URL)
      .pipe(
        tap(console.log)

      )
  }

  create(entity: any) {
    return this.http.post(this.API_URL, entity).pipe(take(1))
  }

  loadByID(id: any) {
    return this.http.get<T>(this.API_URL + `/${id}`).pipe(take(1))
  }

  update(entity: any) {
    return this.http.put(this.API_URL + `/${entity.id}`, entity).pipe(take(1))
  }

  save(entity: any) {
    if (entity.id) {
      return this.update(entity);
    }
    return this.create(entity);
  }

  remove(id: any) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1))
  }
}

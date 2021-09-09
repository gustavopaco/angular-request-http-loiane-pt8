import {pipe} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";

export function filterResponse<T>() {
  return pipe(
    // @ts-ignore
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((response: HttpResponse<T>) => response.body)
  );
}

export function uploadProgress<T>(callback: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      // @ts-ignore
      callback(Math.round((event.loaded * 100) / event.total));
    }
  });
}

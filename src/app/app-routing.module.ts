import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "upload" },
  { path: "cursos", loadChildren: () => import("./cursos/cursos.module").then(mod => mod.CursosModule) },
  { path: "rxjs-poc", loadChildren: () => import("./unsubscribe-rxjs/unsubscribe-rxjs.module").then(mod => mod.UnsubscribeRxjsModule) },
  { path: "upload", loadChildren: () => import("./upload-file/upload-file.module").then(mod => mod.UploadFileModule) },
  { path: "uploadv2", loadChildren: () => import("./upload-file-v2/upload-file-v2.module").then(mod => mod.UploadFileV2Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

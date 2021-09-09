import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadFileV2Component} from "./upload-file-v2.component";

const routes: Routes = [
  { path: "", component: UploadFileV2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileV2RoutingModule { }

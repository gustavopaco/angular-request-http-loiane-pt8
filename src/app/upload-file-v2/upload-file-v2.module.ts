import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileV2RoutingModule } from './upload-file-v2-routing.module';
import { UploadFileV2Component } from './upload-file-v2.component';


@NgModule({
  declarations: [
    UploadFileV2Component
  ],
  imports: [
    CommonModule,
    UploadFileV2RoutingModule
  ]
})
export class UploadFileV2Module { }

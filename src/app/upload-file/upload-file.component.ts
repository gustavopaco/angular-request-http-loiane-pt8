import {Component, OnInit} from '@angular/core';
import {Image} from "../model/image";
import {UploadFileService} from "../services/upload-file.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  imageBaseData: string | ArrayBuffer | null;
  images: Array<Image> = []
  files: Set<File>


  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    // this.fileToBase64(selectedFiles);
    // document.getElementById("formFileMultiple")!!.innerHTML = selectedFiles[0].name;

    let fileNames = [];
    this.files = new Set<File>();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    // document.getElementById("formFileMultiple")!!.innerHTML = fileNames.join(", ")
  }


  /*IMPORTANT: Metodo converte Imagem em Base64*/
  fileToBase64(files: FileList) {

    for (let i = 0; i < files.length; i++) {

      let me = this;
      let image = new Image()
      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        image.nome = file.name;
        image.type = file.type;
        image.base64 = reader.result
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
      me.images.push(image);
    }

    console.log(this.images)
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService.upload(this.files, "/api/upload").subscribe(response => console.log("Upload Concluido"))
    }
  }
}

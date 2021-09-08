import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertModalComponent} from "../shared/alert-modal/alert-modal.component";

export enum AlertTypes {
  DANGER = "danger",
  SUCCESS = "success",
  WARNING = "warning"
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: BsModalService) { }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSucess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS)
  }

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.modal.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }
}

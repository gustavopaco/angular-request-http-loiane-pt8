import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertModalComponent} from "../shared/alert-modal/alert-modal.component";
import {ConfirmModalComponent} from "../shared/confirm-modal/confirm-modal.component";

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
    this.showAlert(message, AlertTypes.DANGER,2000)
  }

  showAlertSucess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS,2000)
  }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modal.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout)
    }
  }

  showConfirm(title: any, body: any, okTxt?: any, cancelTxt?: any) {
    const bsModalRef: BsModalRef = this.modal.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if(cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}

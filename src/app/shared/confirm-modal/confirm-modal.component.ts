import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input()
  title: any;

  @Input()
  body: any;

  @Input()
  cancelTxt: any = "Cancelar";

  @Input()
  okTxt: any = "Sim"

  confirmResult: Subject<boolean>

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject<boolean>();
  }

  onClose() {
    this.confirmAndClose(false)
  }

  onConfirm() {
    this.confirmAndClose(true)
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}

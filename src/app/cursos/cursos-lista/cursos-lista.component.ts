import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CursosService} from "../../services/cursos.service";
import {EMPTY, Observable, of, Subject} from "rxjs";
import {catchError, switchMap, take} from "rxjs/operators";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalService} from "../../services/modal.service";
import {Curso} from "../../model/curso";
import {CrudUtilService} from "../../services/crud-util.service";

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Array<Curso>;

  cursos$: Observable<any>
  error$ = new Subject<boolean>();
  bsModalRef?: BsModalRef
  deleteModalRef: BsModalRef;

  cursoSelecionado: Curso;

  /*Note: Recebendo um parametro do HTML*/
  @ViewChild("deleteModal")
  deleteModal: any;

  constructor(
              private modal: BsModalService,
              private modalService: ModalService,
              private cursosService: CrudUtilService, /*IMPORTANT: SERVICO DE CRUD GENERICO*/
              // private cursosService2: CursosService,
  ) {
  }

  ngOnInit(): void {
    // this.cursosService.list().subscribe(response => this.cursos = response);
    this.onRefresh()
  }

  /*NOTE: Quando clica no botao atualizar ele recarrega a lista de Cursos*/
  onRefresh() {
    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(erro => {
          console.log(erro);
          this.error$.next(true);
          this.handleError();
          return of()
        })
      )

    // this.cursosService.list()
    //   .pipe(
    //     take(1) /* Quantidade de vezes que o observable ira ficar vivo*/
    //   )
    //   .subscribe(
    //   response => console.log(response),
    //     error => console.log(error),
    //   () => console.log("Completo"));
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modal.show(template)
  }

  handleError() {
    this.modalService.showAlertDanger("Erro ao registrar");
    // this.bsModalRef = this.modal.show(AlertModalComponent);
    // this.bsModalRef.content.type = "danger";
    // this.bsModalRef.content.message = "Erro ao registrar";
  }

  hideModal() {
    this.bsModalRef?.hide()
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modal.show(this.deleteModal, {class: "modal-sm"})

    const result$ = this.modalService.showConfirm("Confirmacao", "Tem certeza que deseja remover esse curso?")
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cursosService.remove(curso.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.modalService.showAlertDanger("Erro ao remover curso, tente novamente mais tarde");
        }
      )
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelecionado.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.modalService.showAlertDanger("Erro ao remover curso, tente novamente mais tarde");
          this.deleteModalRef.hide();
        }
      )
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}

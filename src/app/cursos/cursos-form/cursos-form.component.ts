import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CursosService} from "../../services/cursos.service";
import {ModalService} from "../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false
  id: string;
  // curso = new Curso();

  constructor(
    private formBuilder: FormBuilder,
    private cursoService: CursosService,
    private modal: ModalService,
    private router: Router,
    private routes: ActivatedRoute) { }

  ngOnInit(): void {

    // this.activatedRoute.params.pipe(
    //   map((params: any) => params["id"]),
    //   switchMap(id => this.cursoService.loadByID(id)),
    // ).subscribe((response : any) => this.updateForm(response))

    const curso = this.routes.snapshot.data["curso"];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
    })
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

  onSubmit() {
    this.submitted = true
    if (this.form.valid) {

      let msgSuccess = "Curso Criado com sucesso";
      let msgError = "Erro ao criar curso, tente novamente mais tarde"
      if (this.form.value.id) {
        msgSuccess = "Curso Atualizado com sucesso"
        msgError = "Erro ao atualizar curso, tente novamente mais tarde"
      }

      this.cursoService.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSucess(msgSuccess);
          this.router.navigate(["/cursos"]);},
        error => {
          this.modal.showAlertDanger(msgError)}
      )

      /*if (this.form.value.id) {
        //update
        this.cursoService.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSucess("Curso Atualizado com sucesso");
            this.router.navigate(["/cursos"]);
          },
          error => this.modal.showAlertDanger("Erro ao atualizar, tente novamente mais tarde")
        )
      } else {
        this.cursoService.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSucess("Curso cadastrado com sucesso");
            this.router.navigate(["/cursos"]);
          },
          error => this.modal.showAlertDanger("Erro do servidor")
        )
      }
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        this.form.get(campo)?.markAllAsTouched();
      })*/
    }
  }

  aplicaCSSErro(campo: any) {
    return this.isInvalidAndTocuhed(campo) ? "is-invalid" : ""
  }

  isInvalidAndTocuhed(campo: any) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched
  }

  msgErrorNome() {
    if (this.form.get("nome")?.errors?.required) {
      return "Digite o nome de um Curso"
    } else if (this.form.get("nome")?.errors?.minlength) {
      return "Nome deve ter no minimo 3 caracteres"
    } else if (this.form.get("nome")?.errors?.maxlength) {
      return "Nome deve ter no maximo 25 caracteres"
    }
  }
}

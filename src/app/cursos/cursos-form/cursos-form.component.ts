import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
    })
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }

  onSubmit() {
    this.submitted = true
    if (this.form.valid) {
      console.log("submit")
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        this.form.get(campo)?.markAllAsTouched();
      })
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

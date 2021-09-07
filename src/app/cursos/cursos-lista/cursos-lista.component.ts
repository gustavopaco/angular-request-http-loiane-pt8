import { Component, OnInit } from '@angular/core';
import {CursosService} from "../../services/cursos.service";
import {Curso} from "../../model/curso";

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos: Array<Curso>;

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursosService.list().subscribe(response => {
      this.cursos = response
      console.log(response)
    })
  }

}

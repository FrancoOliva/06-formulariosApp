import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  @ViewChild('miFormularioDinamico') miFormularioDinamico!: NgForm;

  persona: Persona = {
    nombre: 'Franco',
    favoritos: [
      {id: 1, nombre: 'League of Legends'},
      {id: 2, nombre: 'Infinity AION'}
    ]
  }

  nombreValido():boolean{
    return this.miFormularioDinamico?.controls.nombre?.invalid && this.miFormularioDinamico?.controls.nombre?.touched;
  }

  guardar(){
    console.log(this.miFormularioDinamico);
  }

}

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

  nuevoJuego: string = '';
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

  eliminar(indice:number){
    this.persona.favoritos.splice(indice,1);
  }

  agregarJuego(){

    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
    
  }

}

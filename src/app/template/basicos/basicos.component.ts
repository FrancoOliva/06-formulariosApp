import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // con ViewChild hacemos referencia al elemento html que nos interesa utilizando su #referenciaLocal
  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido():boolean{

    return this.miFormulario?.controls.producto?.invalid && this.miFormulario?.controls.producto?.touched;
  }

  precioValido():boolean{
    return  this.miFormulario?.controls.precios?.touched &&
            this.miFormulario?.controls.precios?.value < 0;
  }

  guardar(){
    console.log('Formulario completo');

    this.miFormulario.resetForm();
  }

}

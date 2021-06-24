import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // EJEMPLO 1
  // Como este formulario de ejemplo es sencillo, usamos el FormControl
  // formularioBasico: FormGroup = new FormGroup({
  //   nombre:       new FormControl('RTX 4080ti'),
  //   precio:       new FormControl(1500),
  //   existencias:  new FormControl(5)
  // })

  formularioBasico: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)] ],
    precio: [ , [Validators.required, Validators.min(0)] ],
    existencias: [ , [Validators.required, Validators.min(0)] ]
  })

  // si nuestro formulario es algo complejo es mucho mejor utilizar FormBuilder. Este se injecta porque es un SERVICIO
  constructor( private fb: FormBuilder ) { }

  ngOnInit(){

    // De esta forma iniciamos el formulario con valores por defecto
    this.formularioBasico.setValue({
      nombre: 'RTX 4080ti',
      precio: 1600,
      existencias: 10
    });

  }

  esValido( campo: string){

    return this.formularioBasico.controls[campo].errors && this.formularioBasico.controls[campo].touched;

  }

  
  guardarFormulario(){
    
    // Si se apreta el botón guardar, marcamos todos los campos como "tocados" para que aparezcan los errores correspondientes
    if( this.formularioBasico.invalid ){
      this.formularioBasico.markAllAsTouched();
      return;
    }

    console.log(this.formularioBasico.value);
    this.formularioBasico.reset();
  }
}

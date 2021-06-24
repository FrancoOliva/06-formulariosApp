import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  formularioDinamico: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)] ],
    favoritos: this.fb.array([
      ['League of Legends', Validators.required],
      ['Valheim', Validators.required]
    ], Validators.required)
  })

  get favoritosArray(){
    // Este get trabaja con el arreglo de controles que pertenece al control favoritos de -> formularioDinamico
    // Indicamos que lo que estamos retornado es de tipo FormArray
    // De esta forma eliminamos el error que teníamos antes de Abstract Controls
    return this.formularioDinamico.get('favoritos') as FormArray;
  }

  // Podemos crear un control independiente del formulario
  // Para enlazarlo a un input lo hacemos [formControl]="nuevoFavorito"
  // Al ser independiente no podemos utilizar formControlName
  nuevoFavorito: FormControl = this.fb.control('', Validators.required );





  constructor( private fb: FormBuilder ) {

   }

  ngOnInit(): void {
  }


  esValido( campo:string ){
    return this.formularioDinamico.controls[campo].errors && this.formularioDinamico.controls[campo].touched;
  }

  guardarFavorito(){

    if ( this.nuevoFavorito.invalid ) {
      return;
    }

    // Forma 1
    //this.favoritosArray.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );

    // Forma 2
    this.favoritosArray.push( this.fb.control(this.nuevoFavorito.value, Validators.required) );

    this.nuevoFavorito.reset();
  }

  guardar(){

    if( this.formularioDinamico.invalid ){
      this.formularioDinamico.markAllAsTouched();
      return;
    }

    console.log(this.formularioDinamico.value);
  }

}

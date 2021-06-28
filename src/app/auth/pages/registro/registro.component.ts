import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // ToDO: temporal
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedeSerStrider( control: FormControl){
    const value:string = control.value?.trim().toLowerCase();
    
    if(value === 'strider'){

      // Cuando se retorna un obj así, es porque hubo un error

      return {
        yaExisteElUsuario: true
      }
    }

    // Cuando se retorna null en este caso, esta bien, el usuario no existe o en este caso, no es STRIDER
    return null;
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.nombreApellidoPattern )] ],
    email: ['', [ Validators.required, Validators.pattern(this.emailPattern)] ],
    usuario: ['', [ Validators.required, this.noPuedeSerStrider ]]
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Franco Oliva',
      email: 'email@ejemplo.com',
      usuario: 'Yaquen'
    });
  }

  campoNoValido( campo:string ){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  guardarFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}

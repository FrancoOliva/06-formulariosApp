import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// En vez de tener las validaciones en el mismo archivo registro.ts
// Podemos tener esas validaciones en otro archivo y exportarlas o, tenerlas en un servicio por si necesitamos utilizarlas en otras partes de la aplicación
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';

import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern )] ],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern )] ],
    usuario: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.validatorService.camposIguales('password','password2') ]
  });

  constructor( private fb: FormBuilder, private validatorService: ValidatorService ) { }

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

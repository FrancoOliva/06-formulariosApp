import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// En vez de tener las validaciones en el mismo archivo registro.ts
// Podemos tener esas validaciones en otro archivo y exportarlas o, tenerlas en un servicio por si necesitamos utilizarlas en otras partes de la aplicación
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern )] ],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern )], [ this.emailValidator ] ],
    usuario: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.validatorService.camposIguales('password','password2') ]
  });

  
  // este getter se ejecuta siempre que angular detecte un cambio
  get emailErrorMsg():string{
    // almacenamos en una constante los errores del campo email
    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.required ) {
      return 'Por favor ingrese un correo';
    } else if ( errors?.pattern ){
      return 'El formato del correo es inválido';
    } else if ( errors?.existeEmail ){
      return 'El email ya existe'
    }

    return '';
  }

  constructor( private fb: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    // this.miFormulario.reset({
    //   nombre: 'Franco Oliva',
    //   email: 'test10@test.com',
    //   usuario: 'Yaquen'
    // });
  }

  
  campoNoValido( campo:string ){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }
  
  // COMENTAMOS ESTAS VALIDACIONES PORQUE LO VAMOS A HACER DE UNA FORMA MÁS SENCILLA
  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  // }

  // emailPattern(){
  //   return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  // }

  // emailExiste(){
  //   return this.miFormulario.get('email')?.errors?.existeEmail && this.miFormulario.get('email')?.touched;
  // }

  guardarFormulario(){
    // console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}

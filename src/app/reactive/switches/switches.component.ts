import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  formularioSwitches: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true , Validators.required ],
    terminos: [ false , Validators.requiredTrue ]
  });
  
  persona = {
    genero: 'F',
    notificaciones: true
  }
  
  
  
  
  constructor( private fb: FormBuilder ) { }

  ngOnInit(){

    this.formularioSwitches.reset({
      ...this.persona,
      terminos: true
    });

    // Forma 2
    // Los datos de la persona se actualizan de forma sincrónizada con el formulario
    // this.formularioSwitches.valueChanges.subscribe( form => {
    //   delete form.terminos;
    //   this.persona = form;
    // });

  }

  guardar(){
    // Forma 1
    // Los datos de la persona se actualizan al tocar en GUARDAR
    const formValue = { ...this.formularioSwitches.value };
    delete formValue.terminos;

    this.persona = formValue;
  }

  

}

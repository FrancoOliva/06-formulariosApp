import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  formularioDinamico: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)] ]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  esValido( campo:string ){
    return this.formularioDinamico.controls[campo].errors && this.formularioDinamico.controls[campo].touched;
  }

  guardar(){

    if( this.formularioDinamico.invalid ){
      this.formularioDinamico.markAllAsTouched();
      return;
    }

    console.log(this.formularioDinamico.value);
    this.formularioDinamico.reset();
  }

}

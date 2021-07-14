import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider( control: FormControl): ValidationErrors | null {
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

  camposIguales( campo1: string, campo2:string ){

    // devolvemos una función para poder hacer su referencia en las validaciones y que esta se invoque
    // específicamos el tipado para que no nos marque el .group como obsoleto
    return ( formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      // console.log(pass1, pass2);

      if ( pass1 !== pass2 ){

        formGroup.get(campo2)?.setErrors({ noIguales: true});
        return { noIguales: true}
      }

      formGroup.get(campo2)?.setErrors( null ); // esto purgaría cualquier error que tenga el campo. TENER CUIDADO AL USARLO 
      return null;

    }
  }
}

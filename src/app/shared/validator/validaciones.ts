import { FormControl } from "@angular/forms";




export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


export const noPuedeSerStrider = ( control: FormControl ) => {
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


// Para utilizar este método tenemos que convertirlo en una función
// noPuedeSerStrider( control: FormControl){
//     const value:string = control.value?.trim().toLowerCase();
    
//     if(value === 'strider'){

//       // Cuando se retorna un obj así, es porque hubo un error

//       return {
//         yaExisteElUsuario: true
//       }
//     }

//     // Cuando se retorna null en este caso, esta bien, el usuario no existe o en este caso, no es STRIDER
//     return null;
// }
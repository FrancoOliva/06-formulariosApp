import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

// map - permite transformar el valor que emite un Observable y regresar cualquier cosa que uno quiera
// delay - es un pipe que nos permite poder esperar o hacer que algo demore un poco más antes de que emita un valor
import { map, delay } from 'rxjs/operators'; 



// CREAMOS UN SERVICIO PARA UTILIZAR UNA VALIDACIÓN ASINCRONA
// PORQUE QUEREMOS VALIDAR SI EL EMAIL DEL USUARIO EXISTE O NO
@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor( private http: HttpClient ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(email);
    
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
    .pipe(
      delay(3000),
      map( resp => {
        
        // utilizamos un ternario para nuestra condición
        // si la longitud del arreglo es 0 (que no devuelve ningún valor al hacer la petición http)
        // retornamos null (el usuario puede usar ese email)
        // si retorna un valor (el email ya existe digamos) mostramos error
        return ( resp.length === 0) ? null : {existeEmail: true}

      })
    );
  }
}

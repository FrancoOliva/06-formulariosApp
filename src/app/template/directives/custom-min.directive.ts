import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validators } from "@angular/forms";


// Las directivas necesitan el SELECTO, es decir CÓMO lo vamos a utilizar
// para que nuestra directiva funcione, donde vamos a utilizarla, tiene que haber un ngModel y un customMin
// Para que Angular reconozca esta Directiva, tenemos que incluirla en el módulo correspondiente
@Directive({
    selector: '[customMin] [ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validators{

    @Input() minimo!: number;

    constructor(){
        
    }

    validate( control: FormControl ){
        const inputValue = control.value;

        return ( inputValue < this.minimo ) ? { 'customMin': true } : null;
    }
}
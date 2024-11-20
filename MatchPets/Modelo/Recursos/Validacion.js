export class Validacion{
    constructor(){

    }
    validarPatronCorreoElectronico(correoPatron){
        const patron =/^\w+(?:[-.][^\s@]+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/;
        return patron.test(correoPatron);
    }
}
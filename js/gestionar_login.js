let btn_ingresar_docente = document.querySelector('.btn_ingresar_docente');
let btn_ingresar_alumno = document.querySelector('.btn_ingresar_alumno');
let ingreso_alumno = document.querySelector('.ingreso-alumno');
let ingreso_docente = document.querySelector('.ingreso-docente');
let main_index = document.querySelector('.main-index');
let volver_inicio = document.querySelector('.volver-inicio');

document.addEventListener('click', e => {
    if (e.target === btn_ingresar_docente){
        ingreso_docente.classList.add('active');
        ingreso_alumno.classList.remove('active');
        main_index.classList.add('active');

    }
    if (e.target === btn_ingresar_alumno){
        ingreso_alumno.classList.add('active');
        ingreso_docente.classList.remove('active');
        main_index.classList.add('active');

    }
    if (e.target === volver_inicio){
        main_index.classList.remove('active')
        ingreso_alumno.classList.remove('active');
        ingreso_docente.classList.remove('active');

    }

});

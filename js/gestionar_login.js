/* Variables globales para trabajar con DOM en la botonera de inicio */
let btn_ingresar_docente = document.querySelector('.btn_ingresar_docente');
let btn_ingresar_alumno = document.querySelector('.btn_ingresar_alumno');
let ingreso_alumno = document.querySelector('.ingreso-alumno');
let ingreso_docente = document.querySelector('.ingreso-docente');
let main_index = document.querySelector('.main-index');
let volver_inicioA = document.querySelector('.volver-inicioA');
let volver_inicioD = document.querySelector('.volver-inicioD');

/* Evento que se dispara cuadno se carga la pagina
 ORGANIZA LO QUE SE MUESTRA EN EL DOM EN RELACION A LOS EVENTOS DE CLICK DEL USUARIO */
document.addEventListener('DOMContentLoaded', () => {
    
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
    if (e.target === volver_inicioD || e.target === volver_inicioA){
        main_index.classList.remove('active')
        ingreso_alumno.classList.remove('active');
        ingreso_docente.classList.remove('active');

    }

    });
});

 

/* EVENTOS DE CLICK DEL FORM DE LOGIN - BOTON INICIAR SESION */
let btnIniciarSesionAlumno = document.getElementById("btnIniciarSesionAlumno");
btnIniciarSesionAlumno.addEventListener("click",() => {
    if(validarFormIngresoAlumno()){
    buscarAlumnoRegistrado()
    }

});

let btnIniciarSesionDocente = document.getElementById("btnIniciarSesionDocente");
btnIniciarSesionDocente.addEventListener("click",() => {
    if(validarFormIngresoDocente()){
    buscarDocenteRegistrado()
    }

});

/* VARIABLES GLOBALES INFO QUE ENTRA DEL INPUP DE INGRRESO ALUMNO */

let nombreAlumno = document.getElementById ("nombreAlumno").value;
let emailAlumno = document.getElementById("emailAlumno").value;
let contraseñaAlumno = document.getElementById("contraseñaAlumno").value;

/* FUNCION QUE VALIDA EL FORMULARIO ALUMNO Y UTILIZACION DE SWEET ALERT */
function validarFormIngresoAlumno(){

    let nombreAlumno = document.getElementById ("nombreAlumno").value;
    let emailAlumno = document.getElementById("emailAlumno").value;
    let contraseñaAlumno = document.getElementById("contraseñaAlumno").value;
    let arreglo_mensajes = new Array();

    if (!nombreAlumno ){
            arreglo_mensajes.push("Ingrese nombre");          

    }
    if (!emailAlumno){
        arreglo_mensajes.push("Ingrese email");       

    }
    if (!contraseñaAlumno ){
        arreglo_mensajes.push("Ingrese contraseña");    

    }
    if (arreglo_mensajes.length>0){
        let lista = document.createElement("ul");
        lista.textContent = "No es posible iniciar sesion";

        arreglo_mensajes.forEach(element => {
            lista.appendChild(crear_li(element));
        });

        Swal.fire({
            icon: 'error',
            title: lista,
            text: "Por favor, vuelva a intentarlo",
            footer: ""
          })
    }

    return arreglo_mensajes.length == 0;

}

function  crear_li (mensaje){
    
    let li = document.createElement("li");
    li.textContent = mensaje;
    return li;
}

/* CONSTANTE DE JSON */
let url = './js/setting.json' 


/* FUNCION PARA INCORPORAR LA INFO DE JSON */
async function obtenerJSON(){
    const resp = await fetch (url);
    const data = await resp.json();

    return data;
}

obtenerJSON().then(data => console.log(data.alumnos))
    
/* FUNCION QUE BUSCA EL ALUMNO REGISTRADO, NOMBRE, EMAIL Y CONTRASELA */   
function buscarAlumnoRegistrado(){
    obtenerJSON().then ( data =>{

        const nombre = data.alumnos.find( u => u.nombre == nombreAlumno)

        if(nombre.contraseña === contraseñaAlumno){
            console.log("se encontro alumno y ocntraseña")
        }
        if(nombre.email === emailAlumno){
            console.log("se encontro alumno, contraseña y email")
        }
    })
    
}


/*  VARIABLES GLOBALES INFO QUE ENTRA DEL INPUP DE INGRRESO DOCENTE */
let usuarioDocente = document.getElementById ("usuarioDocente").value;
let emailDocente = document.getElementById("emailDocente").value;
let contraseñaDocente = document.getElementById("contraseñaDocente").value;

/* FUNCION QUE VALIDA EL FORMULARIO DOCENTE Y UTILIZACION DE SWEET ALERT */
function validarFormIngresoDocente(){

    let arreglo_mensajes = new Array();

    if (!usuarioDocente ){
            arreglo_mensajes.push("Ingrese usuario");          

    }
    if (!emailDocente){
        arreglo_mensajes.push("Ingrese email");       

    }
    if (!contraseñaDocente ){
        arreglo_mensajes.push("Ingrese contraseña");    

    }
    if (arreglo_mensajes.length>0){
        let lista = document.createElement("ul");
        lista.textContent = "No es posible iniciar sesion";

        arreglo_mensajes.forEach(element => {
            lista.appendChild(crear_li(element));
        });

        Swal.fire({
            icon: 'error',
            title: lista,
            text: "Por favor, vuelva a intentarlo",
            footer: ""
          })
    }

    return arreglo_mensajes.length == 0;

}

function  crear_li (mensaje){
    
    let li = document.createElement("li");
    li.textContent = mensaje;
    return li;
}
    
/* FUNCION QUE BUSCA EL DOCENTE REGISTRADO, USUARIO, EMAIL Y CONTRASÑA */       
function buscarDocenteRegistrado(){
}
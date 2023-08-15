let btn_ingresar_docente = document.querySelector('.btn_ingresar_docente');
let btn_ingresar_alumno = document.querySelector('.btn_ingresar_alumno');
let ingreso_alumno = document.querySelector('.ingreso-alumno');
let ingreso_docente = document.querySelector('.ingreso-docente');
let main_index = document.querySelector('.main-index');
let volver_inicioA = document.querySelector('.volver-inicioA');
let volver_inicioD = document.querySelector('.volver-inicioD');


// Evento que se dispara cuadno se carga la pagina
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

const url= './js/setting.json'  

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

let nombreAlumno = document.getElementById ("nombreAlumno").value;
let emailAlumno = document.getElementById("emailAlumno").value;
let contraseñaAlumno = document.getElementById("contraseñaAlumno").value;

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
    
    
function buscarAlumnoRegistrado(){
    
      /* 
          try {
            // Obtener los datos de usuarios desde el archivo JSON
            let response = fetch("usuarios.json");
            let usuarios = response.json();
      
            // Buscar el usuario en el array
            let usuarioEncontrado = usuarios.find(
              usuario =>
                usuario.email === email && usuario.contrasena === contrasena
            );
      
            if (usuarioEncontrado) {
              // Inicio de sesión exitoso
              alert("Inicio de sesión exitoso");
            } else {
              // Credenciales incorrectas
              alert("Credenciales incorrectas. Intente nuevamente.");
            }
          } catch (error) {
            console.error("Error al obtener los datos de usuarios:", error);
          } */
 }


 function validarFormIngresoDocente(){

    let usuarioDocente = document.getElementById ("usuarioDocente").value;
    let emailDocente = document.getElementById("emailDocente").value;
    let contraseñaDocente = document.getElementById("contraseñaDocente").value;
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
    
    
function buscarDocenteRegistrado(){
}
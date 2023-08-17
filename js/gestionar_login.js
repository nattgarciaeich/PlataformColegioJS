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

//ALUMNO
let btnIniciarSesionAlumno = document.getElementById("btnIniciarSesionAlumno");
btnIniciarSesionAlumno.addEventListener("click",() => {
    if(validarFormIngresoAlumno()){  
        buscarAlumnoRegistrado()
         
    }

});

//DOCENTE
let btnIniciarSesionDocente = document.getElementById("btnIniciarSesionDocente");
btnIniciarSesionDocente.addEventListener("click",() => {
    if(validarFormIngresoDocente()){
    buscarDocenteRegistrado()
    }

});
  

/* FUNCION QUE VALIDA EL FORMULARIO ALUMNO Y UTILIZACION DE SWEET ALERT */
function validarFormIngresoAlumno(){
    let usuarioAlumno = document.getElementById ("usuarioAlumno").value.toLowerCase();
    let emailAlumno = document.getElementById("emailAlumno").value.toLowerCase();
    let contraseñaAlumno = document.getElementById("contraseñaAlumno").value;
   
    let arreglo_mensajes = new Array();

    if (!usuarioAlumno ){
            arreglo_mensajes.push("Ingrese usuario");          

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

//CREA LI PARA MOSTRAR EN LA ALERTA
function  crear_li (mensaje){
    
    let li = document.createElement("li");
    li.textContent = mensaje;
    return li;
}

/* FUNCION QUE VALIDA EL FORMULARIO DOCENTE Y UTILIZACION DE SWEET ALERT */
function validarFormIngresoDocente(){
    let usuarioDocente = document.getElementById ("usuarioDocente").value.toLowerCase();
    let emailDocente = document.getElementById("emailDocente").value.toLowerCase();
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

/* CONSTANTE DE JSON */
let url = './js/setting.json' 


/* FUNCION PARA INCORPORAR LA INFO DE JSON */
async function obtenerJSON(){
    const resp = await fetch (url);
    const data = await resp.json();

    return data;
}
    
/* FUNCION QUE BUSCA EL ALUMNO REGISTRADO, USUARIO, EMAIL Y CONTRASEÑA Y LA COMPARA CON JSON */   
function buscarAlumnoRegistrado(){
    let usuarioAlumno = document.getElementById ("usuarioAlumno").value.toLowerCase();
    let emailAlumno = document.getElementById("emailAlumno").value.toLowerCase();
    let contraseñaAlumno = document.getElementById("contraseñaAlumno").value;

    obtenerJSON().then ( data =>{

        const usuariosRegistrados = data.alumnos.find( u => u.usuario == usuarioAlumno)        

        if(!usuariosRegistrados || usuariosRegistrados.usuario !== usuarioAlumno){
            Toastify({
                text: "Usuario no encontrado o incorrecto",
                className: "info",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

              console.log("usuario incorrecto")
              resetear_form_login()
        }
        
        if(!usuariosRegistrados || usuariosRegistrados.email !== emailAlumno){
            Toastify({
                text: "E-mail no encontrado o incorrecto",
                className: "info",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

            console.log("email incorrecto")
            resetear_form_login()
        }

        if(!usuariosRegistrados || usuariosRegistrados.contraseña !== contraseñaAlumno){
            Toastify({
                text: "Contraseña incorrecta",
                className: "info",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

            console.log("contraseña incorrecta")
            resetear_form_login()
        }else if(usuariosRegistrados.usuario === usuarioAlumno && usuariosRegistrados.contraseña === contraseñaAlumno && usuariosRegistrados.email === emailAlumno){

            console.log("INICIAR SESION")
            sessionStorage.setItem('usuarioIngresado', usuarioAlumno );
            
            let timerInterval
            Swal.fire({
            title: 'Te redireccionaremos a la pagina correspondiente',
            html: 'Aguardá un momento',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
                location.href = "../pages/alumnos.html"
                }
            })          
        }   
    }) 
}



/* FUNCION QUE BUSCA EL DOCENTE REGISTRADO, USUARIO, EMAIL Y CONTRASÑA Y COMPARA CON INFO EN JSON */       
function buscarDocenteRegistrado(){
    let usuarioDocente = document.getElementById ("usuarioDocente").value.toLowerCase();
    let emailDocente = document.getElementById("emailDocente").value.toLowerCase();
    let contraseñaDocente = document.getElementById("contraseñaDocente").value;

    obtenerJSON().then ( data =>{

        const usuariosRegistrados = data.docentes.find( u => u.usuario == usuarioDocente)        

        if(!usuariosRegistrados || usuariosRegistrados.usuario!== usuarioDocente){
            Toastify({
                text: "Usuario no encontrado o incorrecto",
                className: "info",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

            console.log("usuario incorrecto")
            resetear_form_login()
        }
        
        if(!usuariosRegistrados || usuariosRegistrados.email !== emailDocente){
            Toastify({
                text: "E-mail no encontrado o incorrecto",
                className: "info",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
              
            console.log("email incorrecta")
            resetear_form_login()
        }
        
        if(!usuariosRegistrados || usuariosRegistrados.contraseña !== contraseñaDocente){
            Toastify({
                text: "Contraseña incorrecta",
                className: "info",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
              
            console.log("contraseña incorrecta")
            resetear_form_login()
            
        }else if(usuariosRegistrados.usuario === usuarioDocente && usuariosRegistrados.contraseña === contraseñaDocente && usuariosRegistrados.email === emailDocente){
            console.log("INICIAR SESION")

            let timerInterval
            Swal.fire({
            title: 'Te redireccionaremos a la pagina correspondiente',
            html: 'Aguardá un momento',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
                location.href = "../pages/docentes.html"
                }
            })                      
        }
    })
}

//resetear formulario
function resetear_form_login(){
  
    document.getElementById("usuarioAlumno").value = "";
    document.getElementById("emailAlumno").value = "";
    document.getElementById("contraseñaAlumno").value = "";
    document.getElementById("usuarioDocente").value = "";
    document.getElementById("emailDocente").value = "";
    document.getElementById("contraseñaDocente").value = "";
  
  }
/* 
let debesIniciar = document.getElementById("debesIniciar")
debesIniciar.addEventListener("click",() => {
    Toastify({
        text: "Debes iniciar sesion",
        className: "info",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #cac5c5, #f9f8f820)",
        },
        onClick: function(){} // Callback after click
      }).showToast();   
});

   */
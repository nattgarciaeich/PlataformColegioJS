//TRAER INFO DEL LOCAL STORAGE
document.addEventListener("DOMContentLoaded", () => {
    notas_ingresadas = JSON.parse(localStorage.getItem("notas")) || [];
    gen_id = Math.max(...notas_ingresadas.map((nota) => nota.id)) + 1;
  });
  
/* VARIABLE GLOBALES PARA EL ARRAY */

let notas_ingresadas = new Array();
let gen_id = 1

/* DOM Y EVENTOS DE BOTONES DEL FORMULARIO */
let btn_agregar = document.getElementById("btn_agregar");
btn_agregar.addEventListener("click",()=>{

    if (validar_formulario()){

       subirNota();
    }
})

let btn_verNotas = document.getElementById("btn_verNotas");
btn_verNotas.addEventListener("click",()=>{

    if (existen_notas()){

       mostrar_arreglo_notas(notas_ingresadas)      
    }
})

let btn_eliminarNotas = document.getElementById("btn_eliminarNotas");
btn_eliminarNotas.addEventListener("click",()=>{

    if (existen_notas()){

      Swal.fire({
        title: '¿Estas seguro que deseas eliminar la ultima nota subida a la plataforma?',
        text: "No podras recuperarla",
        icon: 'warning', 
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      }).then((result) => {
        if (result.isConfirmed) { 
          eliminar_ultima_nota();         
          Swal.fire(
            'Las nota ha sido eliminada de la plataforma',
          )       
        }
      })     
    }
})


/* FUNCION QUE VALIDA EL FORM, CREA UNA LISTA Y LA MUESTRA EN UN SWEET ALERRT */
function validar_formulario(){

  let input_nombre = document.getElementById("nombre").value;
  let input_apellido = document.getElementById("apellido").value;
  let input_curso = document.getElementById("curso").value;
  let select_materia = document.getElementById ("materia").value;
  let input_nota = document.getElementById("nota").value;

    
  let arreglo_mensajes = new Array();

    if (!input_nombre ){
            arreglo_mensajes.push("- Ingrese nombre");          

    }
    if (!input_apellido ){
        arreglo_mensajes.push("- Ingrese apellido");       

    }
    if (!input_curso || input_curso <= 0 || input_curso > 6 ){
        arreglo_mensajes.push("- Ingrese un curso entre 1° y 6°");     

    }
    if (!select_materia || select_materia == "-"){
        arreglo_mensajes.push("- Seleccione materia");       

    }
    if (!input_nota || input_nota <= 0 || input_nota > 10 ){
        arreglo_mensajes.push("- Ingrese nota");        

    }
    if (arreglo_mensajes.length>0){

        let lista = document.createElement("ul");
        lista.textContent = "No es posible cargar los datos: ";

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

/* FUNCION QUE CREA LA LISTA PARA MOSTRAR EN EL SWEET ALERT */
function  crear_li (mensaje){
    
    let li = document.createElement("li");
    li.textContent = mensaje;
    li.classList.add("lista")
    return li;
}

/* FUNCION CON DOM PARA SUBIR LAS NOTAS DESDE EL FORMULARIO */
function subirNota(){

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let curso = document.getElementById("curso").value;
    let materia = document.getElementById("materia").value;
    let nota = document.getElementById("nota").value;

    let nueva_nota = new Notas_docentes(nombre, apellido, materia, curso, nota);
    nueva_nota.set_id(gen_id);
    gen_id++;
    notas_ingresadas.push(nueva_nota);  

    generar_offcanvas_nota(nueva_nota);
    Toastify({
      text: "Nota subida con éxito!",
      className: "info",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom` 
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #355070, #354f70b6)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
   
}

//VARIABLE DEL OFFCANVAS
let offcanvas = null; 

/* FUNCION QUE GENERA EL OFFCANVAS CON DOM Y EVENTOS Y MUESTRA LA NOTA CARGADA */
function generar_offcanvas_nota(nueva_nota) {

  if (offcanvas) {
    offcanvas.remove();
  }

  offcanvas = document.createElement("div");
  offcanvas.classList.add("offcanvas", "show");

  let btn_cerrar_offcanvas = document.createElement("button");
  btn_cerrar_offcanvas.classList.add("btn_cerrar_offcanvas");
  btn_cerrar_offcanvas.textContent = "X";
  btn_cerrar_offcanvas.addEventListener("click", ocultar_offcanvas);

  let offcanvasHeader = document.createElement("div");
  offcanvasHeader.classList.add("offcanvas-header");
  offcanvasHeader.appendChild(btn_cerrar_offcanvas);

  let offcanvasBody = document.createElement("div");
  offcanvasBody.classList.add("offcanvas-body");

  let nombre = document.createElement("p");
  nombre.textContent = "Alumn@: " + nueva_nota.nombre + " " + nueva_nota.apellido;
  offcanvasBody.appendChild(nombre);

  let materia = document.createElement("p");
  materia.textContent = "Materia: " + nueva_nota.materia;
  offcanvasBody.appendChild(materia);

  let curso = document.createElement("p");
  curso.textContent = "Curso: " + nueva_nota.curso + "°";
  offcanvasBody.appendChild(curso);

  let nota = document.createElement("p");
  nota.textContent = "Nota: " + nueva_nota.nota;
  offcanvasBody.appendChild(nota);

  offcanvas.appendChild(offcanvasHeader);
  offcanvas.appendChild(offcanvasBody);

  let offcanvasContainer = document.getElementById("offcanvasContainer");
  offcanvasContainer.appendChild(offcanvas);

  resetear_form();
}

/* FUNCION PAR AOCULTAR EL OFFCANVAS */
function ocultar_offcanvas() {
  if (offcanvas) {
    offcanvas.remove();
    offcanvas = null;
  }
}

/* FUNCION QUE RESETEA EL FORMULARIO */
function resetear_form(){
  
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("materia").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("curso_filtro").value = "";
    document.getElementById("materia_filtro").value = "";  
  }

  /* FUNCION QUE RECORRE EL ARRAY PARA VER SI HAY NOTAS CARGADAS */
function existen_notas(){
  if(notas_ingresadas.length == 0){
    Swal.fire({
      title: 'No existen notas subidas a la plataforma',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })  
    resetear_form();     
    return false;
            
  }else{
    return true;
  }
}

/* FUNCION QUE MUESTRA EL ARREGLO DE NOTAS UTILIZANDO DOM Y EVENTOS */
function mostrar_arreglo_notas(notas) {

  if (offcanvas) {
    offcanvas.remove();
  }
  
  offcanvas = document.createElement("div");  
  offcanvas.classList.add("offcanvas", "show");

  let btn_cerrar_offcanvas = document.createElement("button");
  btn_cerrar_offcanvas.classList.add("btn_cerrar_offcanvas");
  btn_cerrar_offcanvas.textContent = "X";
  btn_cerrar_offcanvas.addEventListener("click", ocultar_offcanvas);
  offcanvas.appendChild(btn_cerrar_offcanvas);

  let mensaje = "Las notas subidas son:";
  let titulo = document.createElement("h2")
  titulo.textContent = mensaje
  offcanvas.appendChild(titulo)
  
  let ul = document.createElement("ul");
  ul.classList.add("lista_notas");
  
  notas.forEach((nota) => {
    let li = document.createElement("li");
    li.textContent = `Alumn@: ${nota.nombre} ${nota.apellido} Materia: ${nota.materia} Curso: ${nota.curso} ° Nota: ${nota.nota}`;
    li.classList.add("lista_notas");
    ul.appendChild(li);    
  });  
  
  let offcanvasContainer = document.getElementById("offcanvasContainer");
  offcanvas.appendChild(ul);
  offcanvasContainer.appendChild(offcanvas);
}

/* BOTONES DE FILTRADO DE CURSO Y MATERIA - DOM Y EVENTOS */

let btn_filtrarCurso = document.getElementById("btn_filtrarCurso");
btn_filtrarCurso.addEventListener("click", () => {

const cursoSeleccionado = document.getElementById("curso_filtro").value;

  if(!cursoSeleccionado || cursoSeleccionado <= 0 || cursoSeleccionado > 6){
  Swal.fire('No ha ingresado una opcion valida')
  document.getElementById("curso_filtro").value = "";
      
  }else if(existen_notas()){
        filtrar_curso(cursoSeleccionado);
  }
});
  
let btn_filtrarMateria = document.getElementById("btn_filtrarMateria");
btn_filtrarMateria.addEventListener("click", () => {

const materiaSeleccionada = document.getElementById("materia_filtro").value.toLowerCase();
  
  if(!materiaSeleccionada || materiaSeleccionada != "lengua" &&  materiaSeleccionada != "matematica" &&  materiaSeleccionada != "sociales" &&  materiaSeleccionada != "naturales"){
    Swal.fire('No ha ingresado una opcion valida')
    document.getElementById("materia_filtro").value = "";
      
  }else if (existen_notas()) {
      filtrar_materia(materiaSeleccionada);
  }
});


/* FUNCION QUE UTILIZA FILTER Y MUESTRA LAS NOTAS DEL CURSO FILTRADO */
function filtrar_curso(curso) {
  const filtrarCurso = notas_ingresadas.filter((nota) => nota.curso == parseInt(curso));
  if(filtrarCurso == ""){
    Swal.fire({
      title: 'No existen notas subidas a la plataforma de ' + curso + "° año",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })  

    resetear_form()
    ocultar_offcanvas()

  }else
    mostrar_arreglo_notas(filtrarCurso);
    resetear_form()
}

/* FUNCION QUE UTILIZA FILTER Y MUESTRA LAS NOTAS DE LA MATERIA FILTRADA */
function filtrar_materia(materia) {
  const filtrarMateria = notas_ingresadas.filter((nota) => nota.materia.toLowerCase() == materia.toLowerCase());
  if(filtrarMateria == ""){
    Swal.fire({
      title: 'No existen notas subidas a la plataforma de ' + materia,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })  

    resetear_form()
    ocultar_offcanvas()

  }else
    mostrar_arreglo_notas(filtrarMateria);
    resetear_form()
}

/* FUNCION QUE ELIMINA LA ULTIMA NOTA DEL ARREGLO */
function eliminar_ultima_nota() {       
  notas_ingresadas.pop()
  if(notas_ingresadas == ""){
        ocultar_offcanvas()
  }else
  mostrar_arreglo_notas(notas_ingresadas)
}

/* SUBIR LAS NOTAS AL LOCAL STORAGE */
window.addEventListener("beforeunload", () => {
    localStorage.setItem("notas", JSON.stringify(notas_ingresadas));
  });


document.addEventListener("DOMContentLoaded", () => {
    notas_ingresadas = JSON.parse(localStorage.getItem("notas")) || [];
    gen_id = Math.max(...notas_ingresadas.map((nota) => nota.id)) + 1;
  });
  
let notas_ingresadas = new Array();
let gen_id = 1

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

let btn_filtrarCurso = document.getElementById("btn_filtrarCurso");
btn_filtrarCurso.addEventListener("click", () => {
    if (existen_notas()) {
      const cursoSeleccionado = document.getElementById("curso_filtro").value;
      filtrar_curso(cursoSeleccionado);
    }
});
  
let btn_filtrarMateria = document.getElementById("btn_filtrarMateria");
btn_filtrarMateria.addEventListener("click", () => {
    if (existen_notas()) {
      const materiaSeleccionada = document.getElementById("materia_filtro").value;
      filtrar_materia(materiaSeleccionada);
    }
});


function validar_formulario(){

    let input_nombre = document.getElementById("nombre").value;
    let input_apellido = document.getElementById("apellido").value;
    let input_curso = document.getElementById("curso").value;
    let select_materia = document.getElementById ("materia").value;
    let input_nota = document.getElementById("nota").value;

    
    let arreglo_mensajes = new Array();

    if (!input_nombre ){
            arreglo_mensajes.push("Ingrese nombre");          

    }
    if (!input_apellido ){
        arreglo_mensajes.push("Ingrese apellido");       

    }
    if (!input_curso || input_curso <= 0 || input_curso > 6 ){
        arreglo_mensajes.push("Ingrese un curso entre 1° y 6°");     

    }
    if (!select_materia){
        arreglo_mensajes.push("Seleccione materia");       

    }
    if (!input_nota || input_nota <= 0 || input_nota > 10 ){
        arreglo_mensajes.push("Ingrese nota");        

    }
    if (arreglo_mensajes.length>0){

        let lista = document.createElement("ul");
        lista.textContent = "No es posible cargar los datos: ";

        arreglo_mensajes.forEach(element => {
            lista.appendChild(crear_li(element));
        });

        avisos.appendChild(lista);
    }

return arreglo_mensajes.length == 0;

}

function  crear_li (mensaje){
    
    let li = document.createElement("li");
    li.textContent = mensaje;
    return li;
}

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
   
}

let offcanvas = null; 

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
  offcanvasHeader.textContent = "Nota subida con éxito";
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

function ocultar_offcanvas() {
  if (offcanvas) {
    offcanvas.remove();
    offcanvas = null;
  }
}

function resetear_form(){
  
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("materia").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("curso_filtro").value = "";
    document.getElementById("materia_filtro").value = "";

  
  }
  function existen_notas(){
    if(notas_ingresadas.length == 0){
      alert("No existen notas subidas a la plataforma")   
      resetear_form();     
      return false;
            
    }else{
        return true;
    }
}
  
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
  const ul = document.createElement("ul");
  ul.textContent = mensaje;
   ul.classList.add("lista_notas");
  
  notas.forEach((nota) => {
    const li = document.createElement("li");
    li.textContent = `Alumn@: ${nota.nombre} ${nota.apellido} Materia: ${nota.materia} Curso: ${nota.curso} ° Nota: ${nota.nota}`;
    li.classList.add("lista_notas");
    ul.appendChild(li);
  });
  
  let offcanvasContainer = document.getElementById("offcanvasContainer");
  offcanvas.appendChild(ul);
  offcanvasContainer.appendChild(offcanvas);
}
  
function filtrar_curso(curso) {
    const filtrarCurso = notas_ingresadas.filter((nota) => nota.curso == parseInt(curso));
    mostrar_arreglo_notas(filtrarCurso);
    resetear_form()
  }
  
function filtrar_materia(materia) {
    const filtrarMateria = notas_ingresadas.filter((nota) => nota.materia.toLowerCase() == materia.toLowerCase());
    mostrar_arreglo_notas(filtrarMateria);
    resetear_form()
  }

window.addEventListener("beforeunload", () => {
    localStorage.setItem("notas", JSON.stringify(notas_ingresadas));
  });

 /*  localStorage.clear() */
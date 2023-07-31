function generar_offcanvas_nota(nueva_nota) {
    let offcanvas = document.createElement("div");
    offcanvas.classList.add("offcanvas", "show");

    let offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList.add("offcanvas-header");
    offcanvasHeader.textContent = "Nota subida con éxito";

    let offcanvasBody = document.createElement("div");
    offcanvasBody.classList.add("offcanvas-body");

    let contenidoNota = document.createElement("p");
    contenidoNota.textContent = "Nombre: " + nueva_nota.nombre + " " + nueva_nota.apellido + "\nMateria: " + nueva_nota.materia + "\nCurso: " + nueva_nota.curso + "°" + "\nNota: " + nueva_nota.nota;
    offcanvasBody.appendChild(contenidoNota);

    offcanvas.appendChild(offcanvasHeader);
    offcanvas.appendChild(offcanvasBody);

    let offcanvasContainer = document.getElementById("offcanvasContainer");
    offcanvasContainer.appendChild(offcanvas);

    resetear_form();
}


/* let btn_filtrarCurso = document.getElementById("btn_filtrarCurso");
btn_filtrarCurso.addEventListener("click",()=>{

    if (existen_notas()){

       filtrar_curso()      
    }
})

let btn_filtrarMateria = document.getElementById("btn_filtrarMateria");
btn_filtrarMateria.addEventListener("click",()=>{

    if (existen_notas()){

       filtrar_materia()      
    }
}) */

 /* let nueva_nota = new Notas_docentes(nombre, apellido, materia, curso, nota);

    notas_ingresadas.push(nueva_nota);

    if (nueva_nota){
        nueva_nota.set_id(gen_id) ;
        gen_id ++;
        notas_ingresadas.push(nueva_nota);
    }
    generar_offcanvas_nota(nueva_nota); */


/* function generar_card_nota(nueva_nota){
  
   let new_div = document.createElement("div")
   let new_p = document.createElement("p");
   new_div.id ="div"
   new_p.textContent = "Nota subida con exito:" + nueva_nota.nombre + nueva_nota.apellido + "\nMateria: " + nueva_nota.materia + "\nCurso: " + nueva_nota.curso + "°" + "\nNota: " + nueva_nota.nota;

  new_div.appendChild(new_p);
  
   let contenedor = document.getElementById("notaSubida");
   contenedor.appendChild(new_div);
  
  resetear_form();
  } */

  /* 
function mostrar_arreglo_notas(notas) {
  
    let mensaje = "Las notas subidas son:";
    const ul = document.createElement('ul');
    ul.textContent = mensaje
    ul.classList.add('lista_notas');
    
  
    notas.forEach((nota) => {
        const li = document.createElement('li');
        li.textContent =`Nombre: ${nota.nombre} Apellido: ${nota.apellido} Materia: ${nota.materia} Curso: ${nota.curso} Nota: ${nota.nota}`;
        li.classList.add('lista_notas');
        ul.appendChild(li);
    });
  
    offcanvas.appendChild(ul);
  } */
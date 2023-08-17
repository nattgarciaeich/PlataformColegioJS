/* VARIABLE QUE TRAE LA INFO DE SESSION STORAGE DEL INICIO DE SESION */

let usuarioIngresado = sessionStorage.getItem("usuarioIngresado");
console.log(usuarioIngresado)

let url = '../js/setting.json' 

buscar_info_usuario()

/* FUNCION QUE TRAE LA INFO DEL JSON API LOCAL */
async function obtenerJSON(){
    const resp = await fetch (url);
    const data = await resp.json();

    return data;
}
//ARRAY CON LA INFO DE notas de json DEL USUARIO QUE INICIO SESION
let notas = new Array()

/* FUNCION QUE BUSCA LA INFO DEL USUARIO Y PONE LAS NOTAS EN EL ARRAY */
function buscar_info_usuario(){
    obtenerJSON().then ( data =>{

    const infoUsuario = data.alumnos.find( u => u.usuario == usuarioIngresado) 

        if(infoUsuario){
        const listadoNotas = infoUsuario.notas
        notas = listadoNotas
        }

        mostrar_notas_acordion()
        console.log(notas)   
    })
}

/* FUNCION QUE MUESTRA LAS NOSTAS EN EL ACORDION */
function mostrar_notas_acordion(){
    let acordionNotas = document.getElementById("accordion-body")
    acordionNotas.textContent = "";

    let matematica = document.createElement("p")
    matematica.textContent = "Matematica : " + notas.matematica
    acordionNotas.appendChild(matematica)
    
    let lengua = document.createElement("p")
    lengua.textContent = "Lengua : " + notas.lengua
    acordionNotas.appendChild(lengua)

    let sociales = document.createElement("p")
    sociales.textContent = "Sociales : " + notas.sociales
    acordionNotas.appendChild(sociales)

    let naturales = document.createElement("p")
    naturales.textContent = "Naturales : " + notas.naturales
    acordionNotas.appendChild(naturales)

    let arte = document.createElement("p")
    arte.textContent = "Arte : " + notas.arte
    acordionNotas.appendChild(arte)

    let edFisica = document.createElement("p")
    edFisica.textContent = "Educacion Fisica : " + notas.edFisica
    acordionNotas.appendChild(edFisica)

    let ingles = document.createElement("p")
    ingles.textContent = "Ingles : " + notas.ingles
    acordionNotas.appendChild(ingles)
}
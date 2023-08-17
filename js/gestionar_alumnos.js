let usuarioIngresado = sessionStorage.getItem("usuarioIngresado");
console.log(usuarioIngresado)

let url = '../js/setting.json' 

buscar_info_usuario()
/* FUNCION obtenerJSON ESTA EN GESTIONAR LOGIN LINEA 109 */
async function obtenerJSON(){
    const resp = await fetch (url);
    const data = await resp.json();

    return data;
}

function buscar_info_usuario(){
obtenerJSON().then ( data =>{

    const infoUsuario = data.alumnos.find( u => u.usuario == usuarioIngresado) 

    if(infoUsuario){
        const listadoNotas = infoUsuario.notas
        console.log(listadoNotas) 
        return listadoNotas
    }

    mostrar_notas_acordion()

})

}

let notas = new Array()

function mostrar_notas_acordion(){
    let acordionNotas = documen.getElementById("accordion-body")
    acordionNotas.textContent = notas
    
    if (notas.length>0){
        let lista = document.createElement("ul");

        notas.forEach(element => {
            lista.appendChild(crear_li(element));
        });

        acordionNotas.appendChild(lista)
}

    function  crear_li (mensaje){
    
        let li = document.createElement("li");
        li.textContent = mensaje;
        return li;
    }

}
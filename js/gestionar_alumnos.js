let usuarioIngresado = sessionStorage.getItem("usuarioIngresado");
console.log(usuarioIngresado)


/* FUNCION obtenerJSON ESTA EN GESTIONAR LOGIN LINEA 109 */
function mostrar_notas_alumno(){
obtenerJSON().then ( data =>{

    const infoUsuario = data.alumnos.find( u => u.usuario == usuarioIngresado) 

   
        console.log(infoUsuario.notas) 
    
})


}

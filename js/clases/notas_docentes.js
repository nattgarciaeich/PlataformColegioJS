class Notas_docentes{

    constructor(nombre, apellido, materia, curso, nota){
        this.nombre = nombre;
        this.apellido = apellido;
        this.materia = materia;
        this.curso = curso;
        this.nota = nota;
        this.id = -1
    }

    mostrarNotas(){
        return this.nombre + " " + this.apellido + "\n" + this.materia + " " + this.curso + "°" + "\nNota: " + this.nota;
    }

    set_id(nuevo_id){

        this.id = nuevo_id;
    }


}
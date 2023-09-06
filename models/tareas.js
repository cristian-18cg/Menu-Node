const Tarea =require("./tarea");



class Tareas{
    _listado={};
    get listadoArr(){
        const listado =[];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push ( tarea )
       })
       return listado;
    }

    constructor(){
        this._listado={}
        
    }
    
    crearTarea(desc=''){
        const tarea= new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    completartarea(desc) {
        if (this._listado[desc]) {
            this._listado[desc].completado = true;
            return true; // La tarea se marcó como completada correctamente.
        }
        return false; // No se encontró ninguna tarea con el ID proporcionado.
    }
    
}

module.exports=Tareas;
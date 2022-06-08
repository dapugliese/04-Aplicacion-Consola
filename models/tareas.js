const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArr(){
        const listado=[]
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })


        return listado;
    }

    constructor() {
        this._listado ={};
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id]=tarea;

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach((tarea) => {
            this._listado[tarea.id]=tarea;

        });

    }

    listadoCompleto(){
        
        console.log();
        this.listadoArr.forEach((tarea, i) => {
                     
            console.log(` ${(i+1).toString().green}. ${tarea.desc} :: ${tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red }`);
        });
        
    }


    listadoPendientesCompletadas(completadas = true){
        
        console.log();
        let i= 1;

        this.listadoArr.forEach((tarea) => {
            if (completadas&&tarea.completadoEn){
                console.log(` ${i.toString().green}. ${tarea.desc} :: ${tarea.completadoEn.green} `);
                i++;
            }
            else if (!completadas&&!tarea.completadoEn){
                console.log(` ${i.toString().green}. ${tarea.desc} :: ${'Pendiente'.red} `);
                i++;
            }


        });
    }    


    borrarTarea(id){
        if (this._listado[id]){
            delete this._listado[id];


        }
        
    }

    toggleCompletadas(ids =[]){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();

            }
        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;
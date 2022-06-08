require('colors');
const { guardarDB, leerDB } = require('./librerias/guardarArchivo');
//const {mostrarMenu, pausa} = require('./librerias/mensajes');
const {inquireMenu, pausa, leerInput, listadoTareaBorrar, confirmar, mostrarListadoChekList} = require('./librerias/inquirer');
const Tareas = require('./models/tareas');




const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);

    }



    do {

       opt = await inquireMenu();
       

       switch (opt) {
            case '1':
               const desc =await leerInput('Ingrese descripción tarea: ');
               tareas.crearTarea(desc);
               
            break;
       
            case '2':
               tareas.listadoCompleto();
              //console.log(tareas.listadoArr);
            break;
            case '3':
               tareas.listadoPendientesCompletadas();
            break;           
            case '4':
               tareas.listadoPendientesCompletadas(false);
            break;                      

            case '5':
                const ids = await mostrarListadoChekList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;    

            case '6':
               const id = await listadoTareaBorrar(tareas.listadoArr);
               if (id !== '0') {
                    const seguro = await confirmar('¿Está seguro?');
                    if (seguro) tareas.borrarTarea(id);
               }
           break;          

           
        }
       await pausa();
       guardarDB(tareas.listadoArr)
        


    } while (opt !== '0' );

   
}

main();


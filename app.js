require('colors');

//console.log(`${'M'.red}${'e'.yellow}${'n'.blue}${'u'.green}`); //consola con color diferente cada letra

const { guardarDb } = require("./helpers/guardarArchivo");
const { mostrarMenu } = require('./helpers/mensajes');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');
const { guardarDB } = require('./helpers/guardarArchivo');

const main = async () => {//programacion por promesas

  let opt = "";
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        console.log(tareas.listadoArr);
        break;
      case '3':
        const tareasCompletadas = tareas.listadoArr.filter(tarea => tarea.completado === true);
        if (tareasCompletadas.length === 0) {
          console.log('No hay tareas completadas.');
        } else {
          console.log('Tareas completadas:');
          tareasCompletadas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
          });
        }
        await pausa();
        break;


        case '4':
          const tareasPendientes = tareas.listadoArr.filter(tarea => !tarea.completado);
      
          if (tareasPendientes.length === 0) {
              console.log('No hay tareas pendientes.');
          } else {
              console.log('Tareas pendientes:');
              tareasPendientes.forEach((tarea, index) => {
                  console.log(`${index + 1}. ${tarea.desc}`);
              });
          }
      
          await pausa();
          break;  
      case '5':
        const descripcionTareaCompletar = await leerInput('Ingrese la descripción de la tarea a completar: ');

        const tareaEncontrada = tareas.listadoArr.find(tarea => tarea.desc === descripcionTareaCompletar);
    
        if (tareaEncontrada) {
            tareaEncontrada.completado = true;
            console.log(`Tarea "${tareaEncontrada.desc}" marcada como completada.`);
        } else {
            console.log('No se encontró una tarea con esa descripción.');
        }
    
        guardarDB(tareas.listadoArr);
        await pausa();
        break;

case '6':
    const tareasPendientes = tareas.listadoArr.filter(tarea => !tarea.completado);

    if (tareasPendientes.length === 0) {
        console.log('No hay tareas pendientes para borrar.');
    } else {
        console.log('Tareas pendientes:');
        tareasPendientes.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
        });

        const tareaAEliminarIndex = await leerInput('Ingrese el número de la tarea que desea eliminar: ');
        const tareaAEliminar = tareasPendientes[tareaAEliminarIndex - 1];

        if (tareaAEliminar) {
            const confirmacion = await leerInput(`¿Está seguro que desea eliminar la tarea "${tareaAEliminar.desc}"? (s/n): `);
            
            if (confirmacion.toLowerCase() === 's') {
                tareas.borrarTarea(tareaAEliminar.id);
                console.log(`Tarea "${tareaAEliminar.desc}" eliminada.`);
            }
        } else {
            console.log('Número de tarea inválido.');
        }
    }

    guardarDB(tareas.listadoArr);
    await pausa();
    break;

      default:
        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt != '0')




}







main();

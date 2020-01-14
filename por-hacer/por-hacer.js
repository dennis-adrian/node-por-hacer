const fs = require('fs');

let listadoPorHacer = [];

//funcion para leer archivo JSON

const cargarDB = () => {
    try {
        //obtener la información en el archivo JSON
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};


//funcion para guardar las notas en un archivo JSON

const guardarDB = () => {

    //convertir objeto a formato JSON
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        //console.log(data);
    });
}
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
            //las tareas no estan completadas al crearse y por eso completado = false        
    };

    //la funcion .push() permite de forma sencilla almacenar un dato en un arreglo
    //en el índice que corresponde

    listadoPorHacer.push(porHacer);

    guardarDB();
    //para tener una retroalimentacion de que es lo que se añadio a la lista de tareas
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;

        guardarDB();

        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);


    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};
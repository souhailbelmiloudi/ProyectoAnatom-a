import {
    saveData, 
    getDataChanged_collection,
    getDataChanged_document,
    deleteData,
    getData,
    getDataCollection,
    updateData
    } from "./firebase.js"
    const contenedor2 = document.getElementById('contenedor2')

const contenedor = document.getElementById('contenedor')
const formulario = document.getElementById('formulario')
const collection = 'practica'

const mostrarPacientes = (snapshot)=> {
    contenedor.innerHTML = ''
    snapshot.forEach(doc => {
        const div =document.createElement('div')
        div.classList.add('item')
        div.innerHTML=`
        
        <h2>${doc.id}</h2>
        <p> <b>Nombre :</b>${doc.data().nombre}</p>
        <p><b>Apellido :</b>${doc.data().apellido}</p>
        <p><b>Edad :</b>${doc.data().edad}</p>
        <button id="btnEliminar" class="btnEliminar" data-id="${doc.id}">Eliminar</button>
        <button id="btnmostrar" class="btnmostrar" data-id="${doc.id}">Mostrar</button>
        <hr>
        `
        const btnEliminar = div.querySelector('#btnEliminar')
        btnEliminar.addEventListener('click', async (e)=>{
            await deleteData(e.target.dataset.id, collection)
        })

        const btnmostrar = div.querySelector('#btnmostrar')
        btnmostrar.addEventListener('click', async (e)=>{
            const id =e.target.dataset.id
            const dato = await getData(id,collection);

            const { value: formValues } = await Swal.fire({
                title: "Nuevos Datos",
                html: `
                  <label for="nombre">Nombre</label>
                  <input id="Nombre" class="swal2-input" value=${dato.data().nombre}>
                  <label for="nombre">Apellido</label >
                  <input id="apellido" class="swal2-input" value=${dato.data().apellido}>
                  <label for="nombre">Edad</label>
                  <input id="edad" class="swal2-input" value=${dato.data().edad}>
                `,
                showCancelButton: true,
                focusConfirm: false,
                preConfirm: () => {
                  return{
                   nombre :document.getElementById("Nombre").value,
                   apellido :document.getElementById("apellido").value,
                   edad : document.getElementById("edad").value
                  };
                }
              });
              if (formValues) {
               try{
                await updateData(id,collection,formValues)
               }catch(Err){
                Swal.fire(Err);
                          
            }
              }
        
        })

    

        contenedor.appendChild(div)
    });
  }
 getDataChanged_collection(collection , mostrarPacientes)

 // practica Dos
    const div =document.createElement('div')
     div.classList.add('item')
formulario.addEventListener('submit', async (e)=>{
    e.preventDefault()
   
    const nombre = formulario['id'].value;
   const dato = await getData(nombre, collection);
  
    div.innerHTML=`
    <h2>${dato.id}</h2>
        <p> <b>Nombre :</b>${dato.data().nombre}</p>
        <p><b>Apellido :</b>${dato.data().apellido}</p>
        <p><b>Edad :</b>${dato.data().edad}</p>`
    contenedor2.appendChild(div)
   formulario.reset()

}
)
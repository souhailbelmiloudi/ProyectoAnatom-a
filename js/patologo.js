import {
    getDataChanged_collection,
    deleteData,
    getData,
    updateData
    } from "./firebase.js"
    const contenedor2 = document.getElementById('contenedor2')

const contenedor = document.getElementById('contenedor')
const formulario = document.getElementById('formulario')
const collection = 'practica'
const notificacion = false;


const mostrarPacientes = (snapshot) => {
  Swal.fire({
    title: "Pacientes",
    text: "Nuevos pacientes",
    icon: "success",
    });
  contenedor.innerHTML = ''
 
    snapshot.forEach(doc => {
        const div =document.createElement('div')
        div.classList.add('item')
        div.innerHTML=`
        
        <h2> Codigo  :${doc.id}</h2>
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
                title: "Datos del paciente",
              html: `
                <div sytle="display:flex; flex-direction:column; margin: 0 auto; width: 500px;">
                  <label for="nombre">Nombre</label>
                  <input id="Nombre" class="swal2-input" value=${dato.data().nombre} >
                  <label for="nombre">Apellido</label >
                  <input id="apellido" class="swal2-input" value=${dato.data().apellido} >
                  <label for="nombre">Edad</label>
                  <input id="edad" class="swal2-input" value=${dato.data().edad} >
                  <label for="nombre">Sexo</label>
                  <input id="sexo" class="swal2-input" value=${dato.data().sexo} >
                  <label for="nombre">Imagen</label> <br> <br>
                  <img src=${dato.data().imagen} alt="imagen" width="300" height="300">
               </div> `,
                
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
  if (notificacion) { 
    Swal.fire({
      title: "Pacientes",
      text: "nuevos pacientes",
      icon: "success",
    });
    notificacion = false;
  }
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
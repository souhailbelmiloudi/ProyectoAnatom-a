// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getFirestore,
	collection,
	getDocs,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY9SK2bOyabWzzMdLxiOORccw3uX8-ZRU",
  authDomain: "proyectojsdaw.firebaseapp.com",
  projectId: "proyectojsdaw",
  storageBucket: "proyectojsdaw.appspot.com",
  messagingSenderId: "1017735919492",
  appId: "1:1017735919492:web:fb7864cd2dd2994b90cfd1",
  measurementId: "G-SS0P9K2M6N"
};

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore()

//CRUD

// export const saveData = (ref,objeto) => addDoc(collection(db,ref),objeto)
// export const getDataCollection = (ref) => getDocs(collection(db,ref))
// export const getDataChanged = ( ref, callBack) => onSnapshot(collection(db,ref),callBack)
// export const deleteData = (id, ref) => deleteDoc(doc(db,ref,id))
// export const getDataDocument = (id, ref) => getDoc(doc(db,ref,id))
// export const updateData = (id, ref,objeto) => updateDoc(doc(db,ref,id),objeto)
// export const getDataChanged_document = (ref, document, callBack) => 	onSnapshot(doc(db,ref, document),callBack)
// export const getData = (id, ref) => getDoc(doc(db,ref,id))

/**
 * Agrega un nuevo documento a una colección específica 
 * @param {string} ref - La referencia a la colección donde se agregará el documento.
 * @param {Object} objeto - Los datos a agregar como un objeto.
 * @returns {Promise} - Una promesa que se resuelve cuando se agrega el documento.
 */
export const saveData = (ref, objeto) => addDoc(collection(db, ref), objeto);

/**
 * Obtiene todos los documentos de una colección específica en Firestore.
 * @param {string} ref - La referencia a la colección de la cual obtener los documentos.
 * @returns {Promise} - Una promesa que devuelve un snapshot con los datos de la colección.
 */
export const getDataCollection = (ref) => getDocs(collection(db, ref));

/**
 * Establece un listener para detectar cambios en una colección y ejecuta una función callback.
 * @param {string} ref - La referencia a la colección a observar.
 * @param {Function} callBack - La función que se ejecutará cuando haya cambios en la colección.
 * @returns {Function} - La función de desactivación del listener.
 */
export const getDataChanged_collection = (ref, callBack) => onSnapshot(collection(db, ref), callBack);

/**
 * Elimina un documento específico de una colección en Firestore.
 * @param {string} id - El ID del documento a eliminar.
 * @param {string} ref - La referencia a la colección donde se encuentra el documento.
 * @returns {Promise} - Una promesa que se resuelve cuando se elimina el documento.
 */
export const deleteData = (id, ref) => deleteDoc(doc(db, ref, id));

/**
 * Obtiene un documento específico de una colección en Firestore por su ID.
 * @param {string} id - El ID del documento a obtener.
 * @param {string} ref - La referencia a la colección donde se encuentra el documento.
 * @returns {Promise} - Una promesa que devuelve un snapshot con los datos del documento.
 */
export const getDataDocument = (id, ref) => getDoc(doc(db, ref, id));

/**
 * Actualiza un documento específico de una colección en Firestore por su ID.
 * @param {string} id - El ID del documento a actualizar.
 * @param {string} ref - La referencia a la colección donde se encuentra el documento.
 * @param {Object} objeto - Los datos con los que actualizar el documento.
 * @returns {Promise} - Una promesa que se resuelve cuando se actualiza el documento.
 */
export const updateData = (id, ref, objeto) => updateDoc(doc(db, ref, id), objeto);

/**
 * Establece un listener para detectar cambios en un documento específico y ejecuta una función callback(recibe un snapshot que es un objeto que contiene los datos del documento)
 * @param {string} ref - La referencia a la colección donde se encuentra el documento.
 * @param {string} document - El ID del documento a observar.
 * @param {Function} callBack - La función que se ejecutará cuando haya cambios en el documento.
 * @returns {Function} - La función de desactivación del listener.
 */
export const getDataChanged_document = (ref, document, callBack) => onSnapshot(doc(db, ref, document), callBack);

/**
 * Obtiene un documento específico de una colección en Firestore por su ID.
 * @param {string} id - El ID del documento a obtener.
 * @param {string} ref - La referencia a la colección donde se encuentra el documento.
 * @returns {Promise} - Una promesa que devuelve un snapshot con los datos del documento.
 */
export const getData = (id, ref) => getDoc(doc(db, ref, id));


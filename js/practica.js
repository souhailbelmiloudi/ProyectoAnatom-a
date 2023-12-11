let breaks = true;
import { captureImage, descargaImagen,DatosForm,idAleatorio } from './funcion.js';

// const btn_start = document.getElementById('btn-start');
const btn_Reiniciar=document.getElementById('btn-Reiniciar');
const imagenes=document.getElementById('imagenes');
const form = document.getElementById('form-datos');
let datos = {};

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/4mfXsEdPe/";

let model, webcam, labelContainer, maxPredictions; 

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    datos = DatosForm(form.nombre.value, form.apellido.value, form.edad.value, form.sexo.value);
    console.log(datos.nombre);
    init();
});


async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
        if (breaks) {
            if (prediction[i].probability >= 0.90 && i == 1) {
                const img=captureImage(prediction[i].className, webcam.canvas);
                imagenes.appendChild(img);
                console.log(descargaImagen(img,idAleatorio(),datos.nombre,datos.apellido));
                breaks = false;
                btn_Reiniciar.style.display='inline';
            }
        }
    }
}

btn_Reiniciar.addEventListener('click',()=>{
    breaks=true;
    imagenes.innerHTML='';
    btn_Reiniciar.style.display='none';
});

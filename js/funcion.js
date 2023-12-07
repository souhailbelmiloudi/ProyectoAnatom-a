export const captureImage = (className, canvas) => {
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.className = className;
    // Agrega la imagen al cuerpo del documento
    imagenes.appendChild(img);
    //-----------DESCARGAR LA IMAGEN----------------
    // Crear un enlace de descarga
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "capturedImage.png";
    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(downloadLink);
    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();
    // Eliminar el enlace después de la descarga
    document.body.removeChild(downloadLink);
}

export const DatosForm = ( nombre, apellido, edad , sexo) => {
    const datos = {
        nombre : nombre,
        apellido : apellido,
        edad : edad,
        sexo : sexo
    }
    return datos;
}


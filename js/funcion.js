export const captureImage = (className, canvas) => {
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.className = className;
    return img;
}

export const descargaImagen = (img,idAleatorio,nombre,apellido) => {
    // Crear un enlace de descarga
    const downloadLink = document.createElement("a");
    downloadLink.href = img.src;
    downloadLink.download = nombre+""+apellido+"_"+idAleatorio+".png";
    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(downloadLink);
    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();
    // Eliminar el enlace después de la descarga
    document.body.removeChild(downloadLink);
    return downloadLink.download;
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
export const idAleatorio = () => {
    return Math.random().toString(36).substr(2, 9);
}
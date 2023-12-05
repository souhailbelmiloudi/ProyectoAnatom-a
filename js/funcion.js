export const captureImage = (className, canvas) => {
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.className = className;
    return img;
}

export const descargaImagen = (img) => {
    // Crear un enlace de descarga
    const downloadLink = document.createElement("a");
    downloadLink.href = img.src;
    downloadLink.download = "capturedImage.png";
    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(downloadLink);
    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();
    // Eliminar el enlace después de la descarga
    document.body.removeChild(downloadLink);
    return downloadLink.download;
}
  
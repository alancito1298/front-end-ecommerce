// utils/exportUtils.js
import html2canvas from 'html2canvas';

export const descargarImagen = async (ref) => {
  if (ref.current) {
    const canvas = await html2canvas(ref.current);
    const imagenURL = canvas.toDataURL('image/png');
    const enlace = document.createElement('a');
    enlace.href = imagenURL;
    enlace.download = 'factura.png';
    enlace.click();
  }
};

export const compartirFactura = async (ref) => {
  if (navigator.share && ref.current) {
    const canvas = await html2canvas(ref.current);
    const imagenURL = canvas.toDataURL('image/png');

    const response = await fetch(imagenURL);
    const blob = await response.blob();
    const archivo = new File([blob], 'factura.png', { type: 'image/png' });

    try {
      await navigator.share({
        title: 'Factura',
        text: 'Aquí tienes la factura de tu compra.',
        files: [archivo],
      });
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  } else {
    alert("La funcionalidad de compartir no está soportada en este navegador.");
  }
};

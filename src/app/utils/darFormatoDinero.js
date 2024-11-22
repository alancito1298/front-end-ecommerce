const formatearDinero = (cantidad) => {
  if (isNaN(cantidad)) {
    console.error('La cantidad proporcionada no es un número:', cantidad);
    return '0,00'; // Devuelve un valor predeterminado
  }

  const partes = parseFloat(cantidad).toFixed(2).split(".");
  return partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + partes[1];
};

export default formatearDinero;

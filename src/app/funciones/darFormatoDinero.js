const formatearDinero = (cantidad) => {

    const partes = cantidad.toFixed(2).split(".");
    return partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + partes[1];
  };

export default formatearDinero;
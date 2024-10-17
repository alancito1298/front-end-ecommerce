
import Nav from './nav'
import Inicio from '@/app/inicio'
import Productos from './productos'
import ProductosTabla from './admin'
import Carrito from './carrito.js'
import Footer from './footer'
import Factura from './factura'

export default function Home() {
  return (
    <>
 
     <Nav></Nav>
     <Inicio></Inicio>
    <Factura></Factura>
    <Footer></Footer>
    
     </>
     
  )
}

import '../src/app/globals.css';
import React  from "react";
import Carrito from "@/app/carrito";
import Nav from "@/app/nav";
import Footer from '@/app/footer';



export default function MostrarCarrito() {
  return (<div>
<Nav/>
    <Carrito/>
<Footer/>    
    </div>
  );
}
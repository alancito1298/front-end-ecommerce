import '../src/app/globals.css';
import React  from "react";
import Productos from "@/app/productos";
import Nav from "@/app/nav";
import Footer from '@/app/footer';
import Factura from '@/app/factura';



export default function MostrarProductos() {
  return (<div className='h-96 bg-white'>
   
    <Factura ></Factura>
  
    </div>
  );
}
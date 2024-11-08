import '../src/app/globals.css';
import React  from "react";
import Productos from "@/app/productos";
import Nav from "@/app/nav";
import Footer from '@/app/footer';
import Factura from '@/app/factura';



export default function MostrarProductos() {
  return (<div className='h-full bg-white '>

    <Factura ></Factura>

    </div>
  );
}
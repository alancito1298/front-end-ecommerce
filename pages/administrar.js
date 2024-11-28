import '../src/app/globals.css';
import React  from "react";
import Nav from "@/app/components/nav";
import PanelAgregarProducto from '../src/app/components/panelAgregarProducto';
import Footer from '@/app/footer';
import ProductosAdmin from '@/app/productosAdministrador';


export default function MostrarCarrito() {
  return (<section className='bg-indigo-50 min-h-100 p-auto flex flex-col'>
    <Nav/>

    <PanelAgregarProducto />
    <ProductosAdmin></ProductosAdmin>
    <Footer></Footer>   
    </section>

  );
}
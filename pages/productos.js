import '../src/app/globals.css';
import React  from "react";
import Productos from "@/app/productos";
import Nav from "@/app/nav";
import Footer from '@/app/footer';



export default function MostrarProductos() {
  return (<div>
    <Nav/>
    <Productos/>
    <Footer></Footer>
    </div>
  );
}
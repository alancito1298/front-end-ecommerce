import '../src/app/globals.css';
import React  from "react";
import Productos from "@/app/productos";
import Nav from "../src/app/components/nav";
import Footer from '@/app/footer';



export default function MostrarProductos() {
  return (<div>
    <Nav/>
    <Productos/>
    <Footer></Footer>
    </div>
  );
}
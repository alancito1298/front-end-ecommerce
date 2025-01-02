'use client'
import React  from "react";
import Nav from "../src/app/components/nav"
import Footer from '@/app/footer';
import Inicio from '@/app/inicio';




export default function Mostrarhome() {
  return (<div>
<Nav/>
    <Inicio/>
   
<Footer/>    
    </div>
  );
}
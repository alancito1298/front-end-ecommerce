'use client'
import React  from "react";
import Nav from "../src/app/components/nav"
import Footer from '@/app/footer';
import Inicio from '@/app/inicio';
import '../src/app/globals.css';





export default function Mostrarhome() {
  return (<div>
<Nav/>
    <Inicio/>
   
<Footer/>    
    </div>
  );
}
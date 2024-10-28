import '../src/app/globals.css';
import React  from "react";
import LoginForm from '@/app/login';
import Nav from "@/app/nav";
import Footer from '@/app/footer';



export default function MostrarProductos() {
  return (<div>
    <Nav/>
    <LoginForm></LoginForm>
    <Footer></Footer>
    </div>
  );
}
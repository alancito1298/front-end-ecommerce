import '../src/app/globals.css';
import React  from "react";
import LoginForm from '../src/app/components/Login';
import Nav from "../src/app/components/nav";
import Footer from '@/app/footer';



export default function MostrarProductos() {
  return (<div>
    <Nav/>
    <LoginForm></LoginForm>
    <Footer></Footer>
    </div>
  );
}
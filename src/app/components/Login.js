'use client';
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email); // Muestra el email
    console.log('Password:', password); // Muestra la contraseña

    try {
      const response = await fetch('https://back-end-artlimpieza.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log('Response Status:', response.status); // Muestra el estado de la respuesta
      console.log('Response:', data); // Muestra la respuesta del servidor
      
      if (response.ok && data.access_token) { // Cambia a access_token
        localStorage.setItem('token', data.access_token); // Cambiar aquí también
        window.location.href = '/administrar'; // Redirigir a la página
      } else {
        setErrorMessage(data.message || 'Error en las credenciales');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (<div className='w-full py-24 bg-indigo-50'>
    <form
      onSubmit={handleLogin}
      className="space-y-10 p-6 bg-white rounded max-w-96 pt-2  block m-auto  shadow-md  pb-16 gap-10"
    >
      <h2 className="text-2xl font-semibold text-center uppercase text-indigo-600 mt-10 ">Identificate</h2>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <div className=''>
        <label  className="block text-indigo-800 uppercase font-light text-sm">Email</label>
        <input
          type="email"
          value={email} // Cambiar a value para un campo controlado
          onChange={(e) => setEmail(e.target.value)}
          className=" w-full p-2 border rounded text-black "
        />
      </div>
      <div>
        <label className="block text-indigo-800 uppercase font-light text-sm">Contraseña</label>
        <input
          type="password" // Cambiar a type="password"
          value={password} // Cambiar a value para un campo controlado
          onChange={(e) => setPassword(e.target.value)}
          className=" w-full p-2 border rounded text-black "
        />
      </div>
      <button
        type="submit"
        className="w-full py-2  text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Iniciar Sesión
      </button>
    </form></div>
  );
};

export default LoginForm;

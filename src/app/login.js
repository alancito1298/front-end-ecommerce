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

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 p-6 bg-white rounded shadow-md pt-16 pb-40"
    >
      <h2 className="text-2xl font-semibold text-center uppercase text-indigo-600 mt-10">Identificate</h2>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <div>
        <label className="block">Email</label>
        <input
          type="email"
          value={email} // Cambiar a value para un campo controlado
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div>
        <label className="block">Contraseña</label>
        <input
          type="password" // Cambiar a type="password"
          value={password} // Cambiar a value para un campo controlado
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;

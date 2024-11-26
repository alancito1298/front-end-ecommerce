import React from 'react';

const Busqueda = ({ busqueda, handleChange }) => (
  <div className="flex flex-col items-center">
    <h2 className="text-2xl font-light tracking-tight text-indigo-900 uppercase">Productos</h2>
    <div className="flex justify-center p-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleChange}
          className="w-full p-3 pl-10 pr-4 border text-indigo-800 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <svg
          className="absolute left-3 top-3 w-5 h-5 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default Busqueda;

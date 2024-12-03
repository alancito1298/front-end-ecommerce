import React, { useState } from "react";
import emailjs from "emailjs-com";

function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_i9onag7", 
        "template_uhwwg96", 
        formData,
        "mo4N3nPQj0YEy0SGr" 
      )
      .then(
        (response) => {
          console.log("Correo enviado exitosamente:", response);
          setEnviado(true);
          setFormData({ nombre: "", email: "", mensaje: "" }); // Limpia el formulario
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
          setError("Hubo un problema al enviar tu mensaje. Inténtalo más tarde.");
        }
      );
  };

  return (
    <div>
      <h3 className="text-center py-16 text-xl">CONTACTANOS</h3>
      <form
        className="max-w-sm mx-auto py-12 px-2 pb-36"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="bg-green-50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="nombre@email.com"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="mensaje"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
            placeholder="Escribe tu mensaje..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800"
        >
          Enviar
        </button>
        {enviado && (
        <p className="text-green-500 text-center">
          ¡Tu mensaje ha sido enviado exitosamente!
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center">
          {error}
        </p>
      )}
      </form>

     
    </div>
  );
}

export default FormularioContacto;

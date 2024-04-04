import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Compblognoticias = ({ onBlogCreated }) => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const crearBlog = () => {
    let id = localStorage.getItem("blogId") ? parseInt(localStorage.getItem("blogId")) + 1 : 1;
    localStorage.setItem("blogId", id);

    let img = document.getElementById('img').files[0];
    const reader = new FileReader();
    
    reader.addEventListener('load', (event) => {
      let imagenData = event.target.result;
      
      const nuevoBlog = {
        id: id,
        titulo: titulo,
        contenido: contenido,
        imagen: imagenData,
        type: img.type
      };

      console.log(nuevoBlog)
      onBlogCreated(nuevoBlog);
    });

    reader.readAsDataURL(img);
    navigate("/mostrar");
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4 p-6 bg-sky-200 rounded-lg shadow-lg mt-8">
        <h3 className="text-3xl font-semibold text-center mb-6">Crear Noticia</h3>
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="input-style"
          />
          <label className="text-lg font-semibold">Contenido:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="input-style h-32"
          ></textarea>
          <label className="text-lg font-semibold">Imagen:</label>
          <input
            type="file"
            id="img"
            // accept="image/*"
            className="input-style"
          />
          <div className="flex justify-center">
            <button
              className="btn-primary"
              onClick={crearBlog}
            >
              Crear Noticia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compblognoticias;

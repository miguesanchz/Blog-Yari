import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CompEditBlog = ({ blogs, onUpdateBlog }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    const blogEncontrado = blogs.find((b) => b.id === parseInt(id));
    setBlog(blogEncontrado || {});
    setTitulo(blogEncontrado ? blogEncontrado.titulo : "");
    setContenido(blogEncontrado ? blogEncontrado.contenido : "");
  }, [blogs, id]);

  const actualizarBlog = () => {
    let img = document.getElementById('img').files[0];
    const reader = new FileReader();
    
    reader.addEventListener('load', (event) => {
      let imagenData = event.target.result;

      const blogActualizado = {
        ...blog,
        titulo: titulo,
        contenido: contenido,
        imagen: imagenData,
        type: img.type
      };

      onUpdateBlog(blogActualizado);
    });

    reader.readAsDataURL(img);
    navigate(`/mostrar/${id}`);
  };

  console.log(blog)

  return (
    <div className="flex justify-center">
      <div className="w-3/4 p-6 bg-gray-200 rounded-lg shadow-lg mt-8">
        <h3 className="text-3xl font-semibold text-center mb-6">Actualizar Noticia</h3>
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
            accept="image/*"
            className="input-style"
          />
          <div className="flex justify-center">
            <button
              className="btn-primary"
              onClick={actualizarBlog}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompEditBlog;

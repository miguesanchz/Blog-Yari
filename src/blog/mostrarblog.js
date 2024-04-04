import React from "react";
import { Link, useParams } from "react-router-dom";

const Compmostrarblog= ({ blogs, onDelete }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <div className="flex justify-center items-center h-screen">Notica Eliminada</div>;
  }



  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg shadow-lg mt-8">
        <div className="border-b-2 border-gray-300 pb-4 mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">{blog.titulo}</h2>
          <div className="space-x-4">
            <Link to={`/editar/${blog.id}`} className="text-blue-500 font-semibold hover:text-blue-700">Editar</Link>
            <button onClick={() => onDelete(blog.id)} className="text-red-500 font-semibold hover:text-red-700">Borrar</button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-700">{blog.contenido}</p>
          {
            blog.type === 'audio/mpeg' && <audio src={blog.imagen} controls></audio>
          }
          {
            blog.type === 'image/jpeg' && <img src={blog.imagen} alt="imagen" className="ml-4 w-32 h-32 object-cover rounded-lg" />
          }
          {
            blog.type === 'application/pdf' && <iframe src={blog.imagen} title="PDF document"></iframe>
          }
          {
            blog.type === 'image/png' && <img src={blog.imagen} alt="imagen" className="ml-4 w-32 h-32 object-cover rounded-lg" />
          }
          <a href={blog.imagen} download className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">Descargar</a>
        </div>
        {/* Agrega aquí la reproducción de audio si es necesario */}
      </div>
    </div>
  );
};  

export default Compmostrarblog;

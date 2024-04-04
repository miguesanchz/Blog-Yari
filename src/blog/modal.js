import React from "react";
import { Link } from "react-router-dom";
import { NoBlogs } from "./Noblogs";

const CompBlogList = ({ blogs }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-sky-200 rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Lista de Noticias</h2>  
        {blogs.map((blog) => (
          <div key={blog.id} className="border-2 border-gray-300 rounded-lg mb-4 p-4">
            <h3 className="text-xl font-semibold mb-2">{blog.titulo}</h3>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700">{blog.contenido}</p>
              {
            blog.type === 'audio/mpeg' && <audio src={blog.imagen} controls></audio>
          }
          {
            blog.type === 'image/jpeg'  && <img src={blog.imagen} alt="imagen" className="ml-4 w-32 h-32 object-cover rounded-lg" />
          }
          {
            blog.type === 'application/pdf' && <iframe src={blog.imagen} title="PDF document"></iframe>
          }
           {
            blog.type === 'image/png' && <img src={blog.imagen} alt="imagen" className="ml-4 w-32 h-32 object-cover rounded-lg" />
          }
            </div>
            <div className="flex justify-end">
              <Link to={`/mostrar/${blog.id}`} className="text-blue-500 font-semibold hover:text-blue-700 mr-4">Mostrar más</Link>
              {/* Agrega aquí el botón para eliminar si lo deseas */}
            </div>
          </div>
        ))}

      {Array.from({ length: 4 - Math.max(0, blogs?.length - 1) }).map((_, index) => ( <NoBlogs key={index} ></NoBlogs> ))}
      </div>
    </div>
  );
};

export default CompBlogList;

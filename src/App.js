import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CompBlogList from "./blog/modal.js";
import Compmostrarblog from "./blog/mostrarblog.js";
import Compblognoticias from "./blog/blognoticias.js";
import CompEditBlog from "./blog/edicionblog.js";

function App() {
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogsData(storedBlogs);
  }, []);

  const updateLocalStorage = (blogs) => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  };

  const handleCreate = (newBlog) => {
    setBlogsData([...blogsData, newBlog]);
    updateLocalStorage([...blogsData, newBlog]);
  };

  const handleUpdate = (updatedBlog) => {
    const updatedBlogs = blogsData.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogsData(updatedBlogs);
    updateLocalStorage(updatedBlogs);
  };

  const handleDelete = (id) => {
    const updatedBlogs = blogsData.filter((blog) => blog.id !== id);
    setBlogsData(updatedBlogs);
    updateLocalStorage(updatedBlogs);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="bg-white h-full flex flex-col">
        <nav className="bg-sky-700">
          <div className="flex justify-between items-center mx-5 py-3">
            <h1 className="text-white font-bold text-lg">Blog</h1>
            <button
              className="text-white lg:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
            <ul
              className={`${
                isMenuOpen ? "block" : "hidden"
              } lg:flex lg:justify-between lg:items-center lg:mx-0 lg:py-0 lg:w-auto lg:text-sm lg:border-none`}
            >
              <li className="py-2 lg:py-0">
                <Link
                  to="/mostrar"
                  className="text-white hover:text-gray-400 px-4 py-2 block lg:inline-block"
                >
                  Mostrar Noticias
                </Link>
              </li>
              <li className="py-2 lg:py-0">
                <Link
                  to="/crear"
                  className="text-white hover:text-gray-400 px-4 py-2 block lg:inline-block"
                >
                  Ingresar Noticia
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route
            path="/mostrar"
            element={<CompBlogList blogs={blogsData} />}
          />
          <Route
            path="/mostrar/:id"
            element={<Compmostrarblog blogs={blogsData} onDelete={handleDelete} />}
          />
          <Route
            path="/crear"
            element={<Compblognoticias onBlogCreated={handleCreate} />}
          />
          <Route
            path="/editar/:id"
            element={<CompEditBlog blogs={blogsData} onUpdateBlog={handleUpdate} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

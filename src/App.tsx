import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import ColorList from "./components/ColorList";
// Ahora:
import { createRoot } from "react-dom/client";
import { User } from "./types";
import UserList from "./components/UserList";

const initialUsers: User[] = [
  { nombre: 'Juan', apellido: 'Pérez', documento: '12345678', score: 85 },
  { nombre: 'María', apellido: 'Gómez', documento: '87654321', score: 92 },
  { nombre: 'Carlos', apellido: 'López', documento: '11223344', score: 78 },
  { nombre: 'Ana', apellido: 'Martínez', documento: '55667788', score: 88 },
];

const App = () => (
  <div className="container">
    <UserList lista={initialUsers} />
  </div>
);
// Usar createRoot en lugar de ReactDOM.render
const container = document.getElementById("app");

if (!container) {
  throw new Error("No se encontró el elemento con id 'app'");
}

const root = createRoot(container);
root.render(<App />);

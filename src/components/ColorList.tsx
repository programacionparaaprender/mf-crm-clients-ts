import React from 'react';
import "./ColorList.css";
import Swal from "sweetalert2";

// Definir las props del componente
interface ColorListProps {
  lista?: string[]; // lista es opcional y debe ser un array de strings
}

const ColorList: React.FC<ColorListProps> = ({ lista = [] }) => {
  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    Swal.fire({
      title: `Color: ${color} Copied`,
      position: "top-end",
      icon: 'success' as const,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true
    });
  }
  
  // Si la lista es undefined, null o vacía, mostrar mensaje
  if (!lista || lista.length === 0) {
    return (
      <div className="list-group text-center">
        <div className="alert alert-danger" role="alert">
          <b>Sin elementos por mostrar...</b>
        </div>
      </div>
    );
  }

  return (
    <div className="list-group text-center">
      {lista.map((color, index) => (
        <button 
          aria-current="true" 
          title="Copiar" 
          key={index} 
          type="button" 
          style={{
            background: color
          }}
          onClick={() => handleCopyColor(color)}
          className="list-group-item list-group-item-action text-primary botonLista"
        >
          {color}
        </button>
      ))}
    </div>
  );
}

export default ColorList;
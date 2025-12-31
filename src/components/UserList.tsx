import React, { useState } from 'react';
import { User } from '../types';

interface UserListProps {
  lista: User[];
}

const UserList: React.FC<UserListProps> = ({ lista }) => {
  const [users, setUsers] = useState<User[]>(lista);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    nombre: '',
    apellido: '',
    documento: '',
    score: 0
  });

  // Función para agregar un nuevo usuario
  const handleAddUser = () => {
    if (!newUser.nombre || !newUser.apellido || !newUser.documento) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    setUsers([...users, {
      id: newId,
      ...newUser
    }]);

    // Resetear formulario
    setNewUser({
      nombre: '',
      apellido: '',
      documento: '',
      score: 0
    });
    setShowForm(false);
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Función para iniciar la edición de un usuario
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Función para guardar la edición de un usuario
  const handleSaveEdit = () => {
    if (!editingUser) return;

    if (!editingUser.nombre || !editingUser.apellido || !editingUser.documento) {
      alert('Por favor completa todos los campos');
      return;
    }

    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    
    setEditingUser(null);
    setShowForm(false);
  };

  // Función para cancelar la edición/creación
  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
    setNewUser({
      nombre: '',
      apellido: '',
      documento: '',
      score: 0
    });
  };

  return (
    <div className="card card-default">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">Lista de Usuarios</h3>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Crear Usuario
        </button>
      </div>

      {/* Formulario Modal */}
      {showForm && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser ? editingUser.nombre : newUser.nombre}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({...editingUser, nombre: e.target.value});
                      } else {
                        setNewUser({...newUser, nombre: e.target.value});
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser ? editingUser.apellido : newUser.apellido}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({...editingUser, apellido: e.target.value});
                      } else {
                        setNewUser({...newUser, apellido: e.target.value});
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Documento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser ? editingUser.documento : newUser.documento}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({...editingUser, documento: e.target.value});
                      } else {
                        setNewUser({...newUser, documento: e.target.value});
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Score</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="100"
                    value={editingUser ? editingUser.score : newUser.score}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (editingUser) {
                        setEditingUser({...editingUser, score: value});
                      } else {
                        setNewUser({...newUser, score: value});
                      }
                    }}
                  />
                  <div className="form-text">Score debe estar entre 0 y 100</div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={editingUser ? handleSaveEdit : handleAddUser}
                >
                  {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para el modal */}
      {showForm && <div className="modal-backdrop fade show"></div>}

      <div className="card-body">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Score</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.documento}</td>
                  <td>
                    <span className={`badge ${
                      user.score >= 80 ? 'bg-success' : 
                      user.score >= 60 ? 'bg-warning' : 'bg-danger'
                    }`}>
                      {user.score}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => handleEditUser(user)}
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Resumen estadístico */}
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div className="text-muted">
            Total de usuarios: <strong>{users.length}</strong>
          </div>
          {users.length > 0 && (
            <div className="text-muted">
              Score promedio: <strong>
                {(users.reduce((sum, user) => sum + user.score, 0) / users.length).toFixed(1)}
              </strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
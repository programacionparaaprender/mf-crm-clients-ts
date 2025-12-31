import React, { useState } from 'react';
import { User } from '../types';


interface UserListProps {
  lista: User[];
}

const UserList: React.FC<UserListProps> = ({lista}) => {
  const [users] = useState<User[]>(lista);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Documento</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.nombre}</td>
            <td>{user.apellido}</td>
            <td>{user.documento}</td>
            <td>{user.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
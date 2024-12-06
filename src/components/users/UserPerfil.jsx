import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { userId } = useAuth(); // Acceder al ID del usuario desde el contexto

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>ID del Usuario: {userId}</p>
    </div>
  );
};

export default UserProfile;

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Ajusta el ícono a tu preferencia
import CurrentUser from '../users/CurrentUser';
import assets from '../../utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de búsqueda
        console.log('Buscar:', searchTerm);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-transparent w-full py-3 sm:px-10 px-5 flex justify-between items-center">
            <Link to="/catalog"><img src={assets.logo} alt="Store" width={70} className="cursor-pointer" /></Link>
            <form onSubmit={handleSearch} className="flex flex-1 justify-center mx-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-full py-2 px-4 w-full max-w-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buscar..."
                />
            </form>

            <div className="flex items-baseline max-sm:justify-end max-sm:flex-1 space-x-4">
                {!isLoggedIn ? (
                    <>
                        <Link to='/login' className="flex items-center px-4 py-2 rounded-full bg-teal hover:bg-gray-300 transition">
                            <FaSignInAlt />
                            <span className="ml-2">Iniciar Sesión</span>
                        </Link>
                        <Link to='/register' className="flex items-center px-4 py-2 rounded-full bg-pink hover:bg-gray-300 transition">
                            <FaUserPlus />
                            <span className="ml-2">Registrarse</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <button onClick={logout} className="flex items-center px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                            Cerrar sesión
                        </button>
                        <CurrentUser />
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;

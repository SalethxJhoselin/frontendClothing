import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdLockOpen } from 'react-icons/md';
import api from '../../api/apiServices';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [usuario, setUsuario] = useState('')
    const { login } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/auth/register", {
                username: usuario,
                password: contraseña,
                nombre: nombre,
                email: correo
            });
            console.log("sdbdncc")
            const { token } = response.data;
            console.log('token', token);
            localStorage.setItem('token', token);
            login();
        } catch (error) {
            console.error('Error al registrarse:', error.response.data);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <h2 className="text-3xl text-center mb-8">REGÍSTRATE</h2>
                <form className="space-y-8" onSubmit={onSubmit}>
                    <div className="relative border-b border-blue">
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="NOMBRE"
                            onChange={ev => setNombre(ev.target.value)}
                            required
                        />
                    </div>
                    <div className="relative border-b border-blue">
                        <input
                            type="email"
                            id="correo"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="CORREO"
                            onChange={ev => setCorreo(ev.target.value)}
                            required
                        />
                    </div>
                    <div className="relative border-b border-blue">
                        <input
                            type="text"
                            id="usuario"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="NOMBRE DE USUARIO"
                            onChange={ev => setUsuario(ev.target.value)}
                            required
                        />
                    </div>
                    <div className="relative border-b border-blue">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="CONTRASEÑA"
                            onChange={ev => setContraseña(ev.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl text-black"
                        >
                            {showPassword ? <MdLockOpen /> : <MdLock />}
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue text-white text-lg py-4 tracking-wider hover:bg-gray-800 transition-all duration-300"
                        >
                            REGISTRARSE
                        </button>
                    </div>
                    <div className="text-center text-sm">
                        <p className="text-gray-500">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" className="hover:text-black transition-colors">
                                INICIA SESIÓN
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

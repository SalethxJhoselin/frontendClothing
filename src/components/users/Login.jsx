import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdLockOpen } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/apiServices';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault(); // Evita que el formulario se recargue
        //console.log('entreeeeeeeee');
        try {
            const response = await api.post("/auth/login", {
                username: usuario,
                password: contraseña
            });

            const { token } = response.data;
            console.log('token', token);
            localStorage.setItem('token', token);
            login();
        } catch (error) {
            setErrorMessage('Error al iniciar sesión. Verifica tus credenciales');
            console.error('Error al iniciar sesión:', error.response.data);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <h2 className="text-3xl text-center mb-8">INICIAR SESIÓN</h2>
                {errorMessage && (
                    <div className="mb-4 text-center text-red-500 font-bold bg-red-100 border border-red-500 rounded py-2">
                        {errorMessage}
                    </div>
                )}
                <form className="space-y-8" onSubmit={onSubmit}>
                    <div className="relative border-b border-blue">
                        <input
                            type="text"
                            id="usuario"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="USUARIO"
                            autoComplete="off"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                        />
                    </div>

                    <div className="relative border-b border-blue">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="CONTRASEÑA"
                            autoComplete="off"
                            value={contraseña}
                            onChange={e => setContraseña(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl text-black"
                        >
                            {showPassword ? <MdLockOpen /> : <MdLock />}
                        </button>
                    </div>

                    <div className="text-red-500 mb-6">{errorMessage}</div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue text-white text-lg py-4 tracking-wider hover:bg-gray-800 transition-all duration-300"
                        >
                            ENTRAR
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <p className="text-gray-500">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register" className=" hover:text-black transition-colors">
                                REGÍSTRATE
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

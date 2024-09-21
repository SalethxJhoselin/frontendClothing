import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdLockOpen } from 'react-icons/md';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <h2 className="text-3xl text-center mb-8">REGÍSTRATE</h2>
                <form className="space-y-8">
                    <div className="relative border-b border-blue">
                        <input
                            type="text"
                            id="nombre"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="NOMBRE"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="relative border-b border-blue">
                        <input
                            type="email"
                            id="correo"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="CORREO"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="relative border-b border-blue">
                        <input
                            type="text"
                            id="direccion"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="DIRECCIÓN"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="relative border-b border-blue">
                        <input
                            type="text"
                            id="usuario"
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="NOMBRE DE USUARIO"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="relative border-b border-blue">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="block w-full appearance-none bg-transparent border-none placeholder:text-gray-500 text-lg focus:outline-none focus:ring-0 peer"
                            placeholder="CONTRASEÑA"
                            autoComplete="off"
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

import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import Perfil from '../components/users/Perfil';
/*import ManageRoles from '../components/views/administrador/ManageRoles';
import ManagePermissions from '../components/views/administrador/ManagePermissions';*/
import ManageUsuarios from '../components/views/administrador/ManageUsuarios';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import Catalog from '../components/pages/Catalog';
import ManageDiscount from '../components/views/Productos/ManageDiscount';

const MyRoutes = () => {
    const { isLoggedIn } = useAuth();
    return (
        <Routes>
            {/* no logged*/}
            {!isLoggedIn ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>
            ) : (
                <>
                    {/* Si el usuario está logueado, redirigir cualquier intento de acceder a las rutas públicas al home */}
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/register" element={<Navigate to="/" />} />-
                </>
            )}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/" element={<Catalog />} />
            {/*Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/descuento" element={<ManageDiscount />} />



                <Route path="/perfil" element={<Perfil />} />

                {/*<Route path="/admin/roles" element={<ManageRoles />} />
                <Route path="/admin/permissions" element={<ManagePermissions />} />*/}
                <Route path="/admin/users" element={<ManageUsuarios />} />
            </Route>
            {/* Ruta por defecto para redirigir a login si no coincide ninguna ruta */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/catalog" : "/login"} />} />
        </Routes>
    )
}

export default MyRoutes
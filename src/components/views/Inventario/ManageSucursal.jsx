import React, { useState, useEffect } from 'react';
import InputModal from '../Productos/InputModal';
import api from '../../../api/apiServices';

const ManageSucursale = () => {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNombre, setEditNombre] = useState('');

    const getDatos = async () => {
        try {
            const response = await api.get("/sucursal");
            console.log("response.data");
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log("Error al obtener los datos", error);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    const handleNameSubmit = async (sucursal) => {
        if (sucursal.nombre && sucursal.nombre.trim() !== "") {
            try {
                const response = await api.post("/sucursal", sucursal); // Enviar sucursal en el cuerpo del POST
                console.log("Sucursal creada");
                console.log(response);
                getDatos(); // Refrescar la lista de sucursales
            } catch (error) {
                console.error("No se creó la sucursal", error.response?.data);
            }
        } else {
            console.log("El nombre de la sucursal no es válido");
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);  // Establece el ID de la sucursal que está siendo editada
        setEditNombre(item.nombre);
    };

    const handleSave = async (id) => {
        try {
            const response = await api.put(`/sucursal`, {
                id: id,
                nombre: editNombre,
            });
            getDatos();
            setEditId(null);
            console.log('Actualización exitosa', response);
        } catch (error) {
            console.error('Error al actualizar la sucursal', error.response?.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/sucursal/${id}`);
            getDatos();
            setEditId(null);
            console.log('Eliminación exitosa', response);
        } catch (error) {
            console.error('Error al eliminar la sucursal', error.response?.data);
        }
    };

    return (
        <div className="table-container">
            <h2 className="text-3xl text-center mb-3">Gestionar Sucursales</h2>
            <InputModal initialValue="sucursal" onSubmit={handleNameSubmit} />
            <table className="sucursal-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={editNombre}
                                        onChange={(e) => setEditNombre(e.target.value)}
                                    />
                                ) : (
                                    item.nombre
                                )}
                            </td>
                            <td>
                                {editId === item.id ? (
                                    <>
                                        <button onClick={() => handleSave(item.id)}>Guardar</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-btn" onClick={() => handleEdit(item)}>Editar</button>
                                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSucursale;

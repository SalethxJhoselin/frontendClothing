import React, { useState, useEffect } from 'react';
import CreateProduct from './CreateProduct';
import api from '../../../api/apiServices';

const ManageProduct = () => {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNombre, setEditNombre] = useState('');
    const [editTalla, setEditTalla] = useState('');
    const [editPrecio, setEditPrecio] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editColor, setEditColor] = useState('');
    const [editBrand, setEditBrand] = useState('');
    const [editDescuento, setEditDescuento] = useState('');

    // Obtener la lista de productos
    const getDatos = async () => {
        try {
            const response = await api.get("/producto");
            console.log("Productos obtenidos:", response.data);
            setData(response.data);
        } catch (error) {
            console.log("Error al obtener los datos", error);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    // Manejar la creación de un producto
    const handleProductSubmit = async (product) => {
        if (product.nombre && product.nombre.trim() !== "") {
            try {
                console.log("Producto creandooooooooo:", product);
                const response = await api.post("/producto", product); 
                console.log("Producto creado:", response.data);
                getDatos(); // Refrescar la lista de productos
            } catch (error) {
                console.error("No se pudo crear el producto", error.response?.data);
            }
        } else {
            console.log("El nombre no es válido");
        }
    };

    // Manejar edición de un producto
    const handleEdit = (item) => {
        setEditId(item.id); 
        setEditNombre(item.nombre);
        setEditTalla(item.talla);
        setEditPrecio(item.precio);
        setEditCategory(item.category?.id || '');
        setEditColor(item.color?.id || '');
        setEditBrand(item.brand?.id || '');
        setEditDescuento(item.descuento?.id || '');
    };

    // Guardar cambios de la edición
    const handleSave = async (id) => {
        try {
            const response = await api.put(`/producto`, {
                id: id,
                nombre: editNombre,
                talla: editTalla,
                precio: editPrecio,
                category: editCategory ? { id: parseInt(editCategory) } : null,
                color: editColor ? { id: parseInt(editColor) } : null,
                brand: editBrand ? { id: parseInt(editBrand) } : null,
                descuento: editDescuento ? { id: parseInt(editDescuento) } : null,
            });
            getDatos();
            setEditId(null);
            console.log('Producto actualizado:', response.data);
        } catch (error) {
            console.error('Error al actualizar el producto', error.response?.data);
        }
    };

    // Manejar eliminación de un producto
    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/producto/${id}`);
            getDatos();
            setEditId(null);
            console.log('Producto eliminado:', response.data);
        } catch (error) {
            console.error('Error al eliminar el producto', error.response?.data);
        }
    };

    return (
        <div className="table-container">
            <h2 className="text-3xl text-center mb-3">Gestionar Productos</h2>
            {/* Reemplazo de InputModal por CreateProduct */}
            <CreateProduct onSubmit={handleProductSubmit} />

            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Talla</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Color</th>
                        <th>Marca</th>
                        <th>Descuento</th>
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
                                    <input
                                        type="text"
                                        value={editTalla}
                                        onChange={(e) => setEditTalla(e.target.value)}
                                    />
                                ) : (
                                    item.talla
                                )}
                            </td>
                            <td>
                                {editId === item.id ? (
                                    <input
                                        type="number"
                                        value={editPrecio}
                                        onChange={(e) => setEditPrecio(e.target.value)}
                                    />
                                ) : (
                                    item.precio
                                )}
                            </td>
                            <td>
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                    />
                                ) : (
                                    item.category?.nombre || 'N/A'
                                )}
                            </td>
                            <td>
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={editColor}
                                        onChange={(e) => setEditColor(e.target.value)}
                                    />
                                ) : (
                                    item.color?.nombre || 'N/A'
                                )}
                            </td>
                            <td>
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={editBrand}
                                        onChange={(e) => setEditBrand(e.target.value)}
                                    />
                                ) : (
                                    item.brand?.nombre || 'N/A'
                                )}
                            </td>
                            <td>
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={editDescuento}
                                        onChange={(e) => setEditDescuento(e.target.value)}
                                    />
                                ) : (
                                    `${item.descuento?.porcentaje}%` || 'N/A'
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

export default ManageProduct;

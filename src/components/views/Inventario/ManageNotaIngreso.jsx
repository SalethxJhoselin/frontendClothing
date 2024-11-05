import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import api from '../../../api/apiServices';

const ManageNotaIngreso = ({ onSubmit }) => {
    const [notaIngreso, setNotaIngreso] = useState({
        proveedor: '',
        sucursalId: '',
        detalles: [{ producto: { id: '' }, cantidad: '' }],
    });

    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    // Obtener productos y sucursales desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosRes = await api.get('/producto');
                const sucursalesRes = await api.get('/sucursal');
                setProductos(productosRes.data);
                setSucursales(sucursalesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotaIngreso((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDetalleChange = (index, field, value) => {
        const updatedDetalles = [...notaIngreso.detalles];
        updatedDetalles[index][field] = field === 'cantidad' ? value : { id: value };
        setNotaIngreso((prevData) => ({ ...prevData, detalles: updatedDetalles }));
    };

    const addProducto = () => {
        setNotaIngreso((prevData) => ({
            ...prevData,
            detalles: [...prevData.detalles, { producto: { id: '' }, cantidad: '' }],
        }));
    };

    const removeProducto = (index) => {
        const updatedDetalles = notaIngreso.detalles.filter((_, i) => i !== index);
        setNotaIngreso((prevData) => ({ ...prevData, detalles: updatedDetalles }));
    };

    const handleSubmit = () => {
        const formattedData = {
            ...notaIngreso,
            sucursalId: parseInt(notaIngreso.sucursalId),
            detalles: notaIngreso.detalles.map((detalle) => ({
                producto: { id: parseInt(detalle.producto.id) },
                cantidad: parseInt(detalle.cantidad),
            })),
        };

        if (onSubmit) {
            onSubmit(formattedData);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Crear Nota de Ingreso</h2>

            {/* Proveedor */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Proveedor:</label>
                <input
                    type="text"
                    name="proveedor"
                    value={notaIngreso.proveedor}
                    onChange={handleInputChange}
                    placeholder="Nombre del proveedor"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Sucursal */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Sucursal:</label>
                <select
                    name="sucursalId"
                    value={notaIngreso.sucursalId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="">Selecciona una sucursal</option>
                    {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Detalles de productos */}
            <h3 className="text-lg font-bold mt-4">Detalles de Productos</h3>
            {notaIngreso.detalles.map((detalle, index) => (
                <div key={index} className="mt-4 flex items-center gap-4">
                    {/* Producto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Producto:</label>
                        <select
                            value={detalle.producto.id}
                            onChange={(e) => handleDetalleChange(index, 'producto', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Selecciona un producto</option>
                            {productos.map((producto) => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad:</label>
                        <input
                            type="number"
                            value={detalle.cantidad}
                            onChange={(e) => handleDetalleChange(index, 'cantidad', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Botón para eliminar el producto */}
                    {notaIngreso.detalles.length > 1 && (
                        <button
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={() => removeProducto(index)}
                        >
                            <FaMinus />
                        </button>
                    )}
                </div>
            ))}

            {/* Botón para agregar más productos */}
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={addProducto}
            >
                <FaPlus /> Agregar Producto
            </button>

            {/* Botón de enviar */}
            <div className="mt-6">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Crear Nota de Ingreso
                </button>
            </div>
        </div>
    );
};

export default ManageNotaIngreso;

import { useState, useEffect } from 'react';
import api from './api'; // Asumo que tienes un archivo api.js donde defines tus llamadas a la API

function CreateNotaIngresoModal({ closeModal, refreshNotas }) {
    const [sucursales, setSucursales] = useState([]);
    const [productos, setProductos] = useState([]);
    const [nota, setNota] = useState({
        sucursal: '',
        productosSeleccionados: [],
    });

    useEffect(() => {
        // Llamadas a la API para obtener sucursales y productos al cargar el modal
        fetchSucursales();
        fetchProductos();
    }, []);

    const fetchSucursales = async () => {
        try {
            const response = await api.get('/sucursal');
            setSucursales(response.data);
        } catch (error) {
            console.error('Error al obtener las sucursales:', error);
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await api.get('/producto');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleAddProducto = (productoId, cantidad) => {
        setNota((prevNota) => ({
            ...prevNota,
            productosSeleccionados: [
                ...prevNota.productosSeleccionados,
                { productoId, cantidad },
            ],
        }));
    };

    const handleCreateNota = async () => {
        try {
            // Petición POST para enviar los datos de la nota de ingreso
            await api.post('/notas-ingreso', nota);
            refreshNotas(); // Refrescar la lista de notas en el componente principal
            closeModal(); // Cerrar el modal
        } catch (error) {
            console.error('Error al crear la nota de ingreso:', error);
        }
    };

    return (
        <div className="modal">
            <h2>Crear Nota de Ingreso</h2>

            {/*<div>
                <label>Sucursal:</label>
                <select
                    onChange={(e) => setNota({ ...nota, sucursal: e.target.value })}
                    value={nota.sucursal}
                >
                    <option value="">Seleccione una sucursal</option>
                    {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h3>Productos:</h3>
                {productos.map((producto) => (
                    <div key={producto.id}>
                        <span>{producto.nombre} (Precio: {producto.precio})</span>
                        <input
                            type="number"
                            placeholder="Cantidad"
                            min="1"
                            onChange={(e) => handleAddProducto(producto.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <button onClick={handleCreateNota}>Guardar Nota de Ingreso</button>
            <button onClick={closeModal}>Cancelar</button>*/}
        </div>
    );
}

export default CreateNotaIngresoModal;

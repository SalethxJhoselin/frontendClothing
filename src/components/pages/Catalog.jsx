import React, { useState, useEffect } from 'react';
import api from '../../api/apiServices'; // Importa la instancia configurada de Axios
import ProductList from '../views/Catalogo/ProductList';
import ProductDetail from '../views/Catalogo/ProductDetail';
import { useAuth } from '../../context/AuthContext';

const Catalog = () => {
  const { userId } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Activar estado de carga
      try {
        console.log(userId);
        let response;
        if (userId) {
          // Si el userId no es nulo, cargar las recomendaciones personalizadas
          response = await api.post(`/recomendaciones/${userId}/`);
          console.log("Recomendaciones", response.data);

          // Combinar exactas, flexibles y complementarios
          const recommendations = [
            ...response.data.exactas,
            ...response.data.flexibles,
            ...response.data.complementarios,
          ];

          // Mapear los productos a la estructura esperada por el frontend
          setProducts(
            recommendations.map(item => ({
              name: item.nombre,
              price: parseFloat(item.precio),
              originalPrice: parseFloat(item.precio),
              image: item.imagen || 'https://via.placeholder.com/150', // Imagen por defecto si falta
              description: `Categoría: ${item.categoria}`,
              category: item.categoria,
              stock: item.stock,
            }))
          );
        } else {
          // Si el userId es nulo, cargar los productos del catálogo general
          response = await api.get('/productos/');
          console.log("Productos", response);

          // Mapear los productos a la estructura esperada por el frontend
          setProducts(
            response.data.map(item => ({
              id: item.id,
              name: item.nombre,
              price: parseFloat(item.precio),
              originalPrice: parseFloat(item.precio),
              image: item.imagen_url || 'https://via.placeholder.com/150', // Imagen por defecto si falta
              description: item.descripcion,
              category: item.categoria,
              brand: item.marca,
              colors: item.colores,
              sizes: item.tallas,
              stock: item.stock,
              dateAdded: item.fecha_agregado,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Desactivar estado de carga
      }
    };

    fetchData();
  }, [userId]); // Escuchar cambios en `userId`

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {userId ? "Recomendaciones Personalizadas" : "Catálogo de Productos"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Cargando productos...</p>
        </div>
      ) : (
        <>
          {/* Lista de productos */}
          <ProductList products={products} onSelect={setSelectedProduct} />

          {/* Detalle del producto seleccionado */}
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;

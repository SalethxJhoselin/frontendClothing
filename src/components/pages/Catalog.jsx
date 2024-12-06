import React, { useState, useEffect } from 'react';
import api from '../../api/apiServices'; // Importa la instancia configurada de Axios
import ProductList from '../views/Catalogo/ProductList';
import ProductDetail from '../views/Catalogo/ProductDetail';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get('/productos/')
      .then(response => {
        console.log("response", response);
        
        // Mapear los productos a la nueva estructura que se recibe del backend
        const backendProducts = response.data.map(item => ({
          id: item.id,
          name: item.nombre,
          price: parseFloat(item.precio), // Convertir precio a número
          originalPrice: parseFloat(item.precio),
          image: item.imagen_url || 'https://via.placeholder.com/150', // Imagen por defecto si falta
          description: item.descripcion,
          category: item.categoria, // Relacionado a la categoría
          brand: item.marca, // Relacionado a la marca
          colors: item.colores, // Relacionado a los colores
          sizes: item.tallas, // Relacionado a las tallas
          stock: item.stock,
          dateAdded: item.fecha_agregado,
        }));

        setProducts(backendProducts);
      })
      .catch(error => {
        console.error("Error fetching products", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Ropa</h1>
      
      {/* Lista de productos */}
      <ProductList products={products} onSelect={setSelectedProduct} />
      
      {/* Detalle del producto seleccionado */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Catalog;

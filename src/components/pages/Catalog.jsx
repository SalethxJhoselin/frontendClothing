import React, { useState, useEffect } from 'react';
import api from '../../api/apiServices'; // Importa la instancia configurada de Axios
import ProductList from '../views/Catalogo/ProductList';
import ProductDetail from '../views/Catalogo/ProductDetail';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get('/producto/catalogo')
      .then(response => {
        console.log("response");
        console.log(response)
        const backendProducts = response.data.map(item => ({
          id: item.id,
          name: item.nombre,
          price: item.precio - (item.descuento ? (item.precio * item.descuento.porcentaje / 100) : 0),
          originalPrice: item.precio,
          image: item.imagen || 'https://via.placeholder.com/150', // Imagen por defecto si falta
          description: `${item.nombre} de la marca ${item.brand.nombre}. 
                        Talla: ${item.talla.nombre}. 
                        Color: ${item.color.nombre}. 
                        Categoría: ${item.category.nombre}. 
                        ${item.descuento ? `Descuento: ${item.descuento.porcentaje}% (${item.descuento.nombre})` : ''}`,
          discount: item.descuento ? `${item.descuento.porcentaje}% de descuento (${item.descuento.nombre})` : null,
          category: item.category.nombre,
          brand: item.brand.nombre,
          size: item.talla.nombre,
          color: item.color.nombre,
          inventory: item.cantidadEnInventario,
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
      <ProductList products={products} onSelect={setSelectedProduct} />
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

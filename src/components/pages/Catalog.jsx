import React, { useState } from 'react';
import products from '../../utils/Products';
import ProductList from '../views/Catalogo/ProductList';
import ProductDetail from '../views/Catalogo/ProductDetail';

const Catalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

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

import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        onClick={() => onSelect(product)}
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default ProductCard;

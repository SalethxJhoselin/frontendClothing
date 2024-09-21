import React from 'react';

const ProductDetail = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 relative">
        <button className="absolute top-2 right-2" onClick={onClose}>X</button>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
        <h3 className="text-2xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;

import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';

const ProductCard = ({ product, onSelect }) => {
  const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad
  const { addToCart } = useCart();
  // Función para manejar el cambio en el input, asegurando solo números
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Permitir solo números positivos y no vacíos
    if (!isNaN(value) && Number(value) > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, Number(quantity));  // Agrega el producto al carrito
    console.log(`Producto: ${product.name}, Cantidad: ${quantity}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold">{product.name}</h3>

      {/* Muestra el descuento si existe */}
      {product.discount && <p className="text-red-500">{product.discount}</p>}

      <p className="text-gray-600">${product.price.toFixed(2)}</p>

      {/* Muestra el precio original tachado si hay descuento */}
      {product.price !== product.originalPrice && (
        <p className="line-through text-gray-400">${product.originalPrice.toFixed(2)}</p>
      )}

      {/* Nueva información: talla, marca, color */}
      <p className="text-gray-500">Talla: {product.size}</p>
      <p className="text-gray-500">Marca: {product.brand}</p>
      <p className="text-gray-500">Color: {product.color}</p>

      {/* Muestra si hay inventario o está agotado */}
      {product.inventory > 0 ? (
        <p className="text-green-500">En stock: {product.inventory}</p>
      ) : (
        <p className="text-red-500">Agotado</p>
      )}

      {/* Botón para ver detalles */}
      <button
        className="bg-blue text-white py-2 px-4 rounded mt-4 mr-4"
        onClick={() => onSelect(product)}
      >
        Ver Detalles
      </button>

      {/* Input para cantidad y botón de agregar al carrito */}
      <div className="mt-4 flex items-center">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 p-2 border rounded mr-4"
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ onClose }) => {
    const { cart, clearCart } = useCart(); // Accede a los productos en el carrito
    const navigate = useNavigate();

    const handlePurchase = () => {
        // Simula la redirección a una página de pago de Stripe
        const stripeQRCodeURL = "https://buy.stripe.com/test_buy"; // URL del QR simulado de Stripe
        // Redirigir al usuario a Stripe
        window.open(stripeQRCodeURL, '_blank');
        const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
        // Prepara los datos para enviar al backend
        const purchaseData = {
            items: cart.map(product => ({
                id: product.id,
                name: product.name,
                quantity: product.quantity,
                price: product.price.toFixed(2),
                discount: product.discount,
            })),
            subtotal: subtotal.toFixed(2),
        };
        console.log("purchaseData");
        console.log(purchaseData);
        // Simula la finalización del pago y muestra la nota de compra
        navigate('/purchase-receipt');// Redirige a una página de recibo de compra
        setTimeout(() => {
            //clearCart(); // Limpiar el carrito después de la compra, pero cuando se limpia, la nota de compra tambien se elimina
        }, 10000); // Ajusta el tiempo según lo necesario para simular el pago
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 relative">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    X
                </button>
                <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>

                {cart.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío.</p>
                ) : (
                    <div>
                        {/* Mapeamos los productos en el carrito */}
                        {cart.map(product => (
                            <div key={product.id} className="border-b py-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p>Cantidad: {product.quantity}</p>
                                    <p>Precio (con descuento): ${product.price.toFixed(2)}</p>
                                    {product.discount && (
                                        <p className="text-red-500">
                                            Descuento: {product.discount}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {/* Botón de Comprar al final de la lista */}
                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                                onClick={handlePurchase}
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;

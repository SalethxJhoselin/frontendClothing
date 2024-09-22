import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const InputModal = ({ initialValue, onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showExtraInput, setShowExtraInput] = useState(false);
    const [extraInputValue, setExtraInputValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
        setExtraInputValue('');
        if (initialValue === "descuento") {
            setShowExtraInput(true);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setShowExtraInput(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        /*console.log("entro qwe")
        // Si el valor ingresado es "categoria", muestra el segundo input
        if (value.toLowerCase() === 'qwe') {//esta es una belleza, no sabia que existia
            setShowExtraInput(true);
        } else {
            setShowExtraInput(false);
            setExtraInputValue(''); // Limpia el segundo input si no es "categoria"
        }*/
    };

    const handleExtraInputChange = (e) => {
        setExtraInputValue(e.target.value);
    };

    const handleSubmit = () => {
        if (onSubmit) {
            const result = {
                nombre: inputValue,
                porcentaje: extraInputValue || null, // Solo envía el porcentaje si está presente
            };
            onSubmit(result);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={showModal} className="open-modal-btn">
                <FaPlus />Agregar
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Ingrese un Nombre</h2>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Escribe un nombre..."
                        />
                        {showExtraInput && (
                            <div>
                                <h2>Ingrese el Porcentaje</h2>
                                <input
                                    type="text"
                                    value={extraInputValue}
                                    onChange={handleExtraInputChange}
                                    placeholder="Escribe un porcentaje..."
                                />
                            </div>
                        )}
                        <div className="modal-buttons">
                            <button onClick={handleSubmit} className="edit-btn">
                                Enviar
                            </button>
                            <button onClick={handleClose} className="delete-btn">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputModal;

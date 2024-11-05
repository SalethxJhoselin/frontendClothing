import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import api from '../../../api/apiServices';

const CreateProduct = ({ onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        category: null,
        color: null,
        size: null,
        brand: null,
        descuento: null,
    });

    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Fetch data for select inputs
    const fetchSelectableData = async () => {
        try {
            const [colorsRes, sizesRes, brandsRes, discountsRes, categoriesRes] = await Promise.all([
                api.get('/color'),
                api.get('/size'),
                api.get('/brand'),
                api.get('/discount'),
                api.get('/category'),
            ]);
            setColors(colorsRes.data);
            setSizes(sizesRes.data);
            setBrands(brandsRes.data);
            setDiscounts(discountsRes.data);
            setCategories(categoriesRes.data);
        } catch (error) {
            console.error('Error fetching selectable data:', error);
        }
    };

    useEffect(() => {
        fetchSelectableData();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const present_name = "clothing";
    // Función para subir la imagen a Cloudinary
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', present_name); // Reemplaza con tu upload_preset de Cloudinary
            setUploadingImage(true);

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dxtic2eyg/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                const imageUrl = data.secure_url;
                console.log("imageUrl");
                console.log(imageUrl);
                setProductData((prevData) => ({
                    ...prevData,
                    imagen: imageUrl,
                }));
                setUploadingImage(false);
            } catch (error) {
                console.error('Error subiendo la imagen a Cloudinary:', error);
                setUploadingImage(false);
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const handleSubmit = () => {
        const formattedData = {
            ...productData,
            category: productData.category ? { id: parseInt(productData.category) } : null,
            color: productData.color ? { id: parseInt(productData.color) } : null,
            size: productData.size ? { id: parseInt(productData.size) } : null,
            brand: productData.brand ? { id: parseInt(productData.brand) } : null,
            descuento: productData.descuento ? { id: parseInt(productData.descuento) } : null,
        };

        console.log("Datos enviados:", formattedData);

        if (onSubmit) {
            onSubmit(formattedData);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={showModal} className="flex items-center gap-2 bg-blue text-white px-4 py-2 rounded hover:bg-teal">
                <FaPlus /> Agregar Producto
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-full overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Crear Producto</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={productData.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Escribe un nombre..."
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            {/* Precio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Precio:</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={productData.precio}
                                    onChange={handleInputChange}
                                    placeholder="Escribe el precio..."
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            {/* Color */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color:</label>
                                <select
                                    name="color"
                                    value={productData.color}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Selecciona un color</option>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Talla:</label>
                                <select
                                    name="size"
                                    value={productData.size}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Selecciona una talla</option>
                                    {sizes.map((size) => (
                                        <option key={size.id} value={size.id}>
                                            {size.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Marca:</label>
                                <select
                                    name="brand"
                                    value={productData.brand}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Selecciona una marca</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Descuento:</label>
                                <select
                                    name="descuento"
                                    value={productData.descuento}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Selecciona un descuento</option>
                                    {discounts.map((descuento) => (
                                        <option key={descuento.id} value={descuento.id}>
                                            {descuento.porcentaje}% - {descuento.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Categoría:</label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Dropzone para subir la imagen */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Imagen:</label>
                                <div {...getRootProps()} className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Suelta la imagen aquí...</p>
                                    ) : (
                                        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.</p>
                                    )}
                                </div>
                                {uploadingImage && <p>Subiendo imagen...</p>}
                            </div>

                            {/* Imagen seleccionada */}
                            {productData.imagen && (
                                <div className="mt-6">
                                    <img src={productData.imagen} alt="Vista previa de la imagen" className="max-w-xs rounded-lg shadow-md" />
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-blue text-white rounded hover:bg-teal"
                                onClick={handleSubmit}
                            >
                                Crear Producto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateProduct;
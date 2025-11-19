import { useState } from "react";
import ProductCard from "./ProductCard";
import initialProducts from "../data/products";

function ProductList() {
    const [products, setProducts] = useState(initialProducts);

    // Likes
    const [likes, setLikes] = useState({});

    const handleLike = (id) => {
        setLikes((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    // Form + Editing
    const [formData, setFormData] = useState({
        name: "",
        signature: "",
        price: "",
        category: "",
    });

    const [editingProduct, setEditingProduct] = useState(null);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || "",
            signature: product.signature || "",
            price: String(product.price) || "",
            category: product.category || "",
        });
    };



    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, signature, price, category } = formData;

        // Validaciones
        if (!name.trim() || !signature.trim()) {
            alert("Nombre y marca no pueden estar vacíos");
            return;
        }

        if (price === "" || isNaN(Number(price)) || Number(price) <= 0) {
            alert("El precio debe ser mayor a 0");
            return;
        }

        // UPDATE
        if (editingProduct) {
            const updated = products.map((p) =>
                p.id === editingProduct.id
                    ? {
                          ...p,
                          name,
                          signature,
                          price: Number(price),
                          category,
                      }
                    : p
            );

            setProducts(updated);
            setEditingProduct(null);
        } else {
            // CREATE
            const newProduct = {
                id: crypto.randomUUID(),
                name,
                signature,
                price: Number(price),
                category,
            };

            setProducts([...products, newProduct]);
        }

        // limpiar form
        setFormData({
            name: "",
            signature: "",
            price: "",
            category: "",
        });
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Marca"
                        value={formData.signature}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                signature: e.target.value,
                            })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                    />

                    <button type="submit">
                        {editingProduct
                            ? "Guardar cambios"
                            : "Agregar producto"}
                    </button>
                </form>
            </div>

            <div>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        likes={likes[product.id] || 0}
                        onLike={() => handleLike(product.id)}
                        onDelete={() => handleDelete(product.id)}
                        onEdit={() => handleEdit(product)}
                    />
                ))}
            </div>
        </>
    );
}

export default ProductList;

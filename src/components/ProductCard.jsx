function ProductCard({ product, likes, onLike, onDelete, onEdit }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
            }}
        >
            <h3>{product.name}</h3>
            <p>Marca: {product.signature}</p>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>

            <p>Likes: {likes}</p>

            <button onClick={onLike}>Like</button>
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
        </div>
    );
}

export default ProductCard;

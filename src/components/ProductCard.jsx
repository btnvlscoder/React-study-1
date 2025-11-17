
function ProductCard({product, likes, onLike}){

    return(
        <div>
            <h3>{product.name}</h3>
            <h2>{product.signature}</h2>
            <p>{product.price}</p>

            <p>Likes: {likes}</p>

            <button onClick={onLike}>Like</button>
        </div>
    );
}

export default ProductCard;
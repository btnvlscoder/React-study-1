import {useState} from "react"
import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductList(){

    const [likes, setLikes] = useState({});

    const handleLike = (id) => {
        setLikes(prev => ({
            ...prev,
            [id]: (prev[id]|| 0) +1,
        }));
    };

    return(
        <div>
            {products.map(product =>(
                <ProductCard
                    key={product.id}
                    product = {product}
                    likes ={likes[product.id] || 0}
                    onLike={() => handleLike(product.id)}
                />
            ))}
        </div>
    )
}

export default ProductList;
import { Link, useParams } from "react-router-dom";

export function ProductPage() {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>Product</h1>
            <p>Product ID: {params.idProduct}</p>
            <p>Restaurant ID: {params.idRestaurant}</p>
            <Link to='/'>Go to Home</Link>
        </div>
    )
}
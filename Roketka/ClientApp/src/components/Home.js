import React, { useEffect, useState } from 'react';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("api/products/GetProducts")
            .then(response => { return response.json() })
            .then(responseJson => {
                setProducts(responseJson)
            });
    }, []);

    return (
        <div>
            {
                products.map((item) => (
                    <p>{item.title}</p>
                    ))
            }
        </div>
    );
}

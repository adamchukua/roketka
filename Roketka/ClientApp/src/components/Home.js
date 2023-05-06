import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Counter from './Counter';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("api/Products/GetProducts")
            .then(response => { return response.json() })
            .then(responseJson => {
                setProducts(responseJson)
            });
    }, []);

    return (
        <Layout.Content className="content">
            {
                products.map((item) => (
                    <p>{item.title}</p>
                    ))
            }

            <Counter/>
        </Layout.Content>
    );
}

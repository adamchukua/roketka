import React from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
    const id = useParams()["id"];

    return (
        <div>
            product {id}
        </div>
    )
}
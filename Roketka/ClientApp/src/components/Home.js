import React from 'react';
import ProductsList from './ProductsList';

export default function Home() {
    return (
        <>
            <header>
                <div className="header-content">
                    <h1 className="header--title">Знижки від 50%*</h1>

                    <small className="header--small">*Тільки на товари що закінчились</small>
                </div>
            </header>

            <ProductsList />
        </>
    );
}

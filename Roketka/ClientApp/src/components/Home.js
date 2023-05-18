import React from 'react';
import ProductsList from './ProductsList';
import HeaderStykes from '../styles/header.module.css';

export default function Home() {
    return (
        <>
            <header>
                <div className={HeaderStykes.headerContent}>
                    <h1 className={HeaderStykes.headerTitle}>Знижки від 50%*</h1>

                    <small>*Тільки на товари що закінчились</small>
                </div>
            </header>

            <ProductsList />
        </>
    );
}

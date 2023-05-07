import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import ProductsList from './ProductsList';

export default function Home() {
    return (
        <Layout.Content className="content">
            <header>
                <div className="header-content">
                    <h1 className="header--title">Знижки від 50%*</h1>

                    <small className="header--small">*Тільки на товари що закінчились</small>
                </div>
            </header>

            <ProductsList />
        </Layout.Content>
    );
}

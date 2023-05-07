import React from 'react';
import { Layout } from 'antd';
import ProductsList from './ProductsList';

export default function Catalog() {
    return (
        <>
            <Layout.Sider style={{ background: 'red' }} width={200}>

            </Layout.Sider>

            <Layout.Content>
                <ProductsList />
            </Layout.Content>
        </>
    );
}

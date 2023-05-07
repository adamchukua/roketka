import React from 'react';
import { Layout } from 'antd';
import ProductsList from './ProductsList';
import SectionsMenu from './SectionsMenu';

export default function Catalog() {
    return (
        <>
            <Layout.Sider width={300} style={{ background: '#fff', marginRight: 20 }}>
                <SectionsMenu />
            </Layout.Sider>

            <Layout.Content>
                <ProductsList spanCard={8} />
            </Layout.Content>
        </>
    );
}

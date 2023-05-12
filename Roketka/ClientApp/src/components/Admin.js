import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProducts } from '../features/products/productsSlice';
import PrintData from './PrintData';

const columns = [
    {
        title: "id",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Назва",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Категорія",
        dataIndex: "sectionId",
        key: "sectionId",
    },
    {
        title: "Кількість",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Ціна",
        dataIndex: "price",
        key: "price",
    }
];

export default function Admin() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const productsList = products.products.map(product => ({ ...product, key: product.id }));
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedProductIds(newSelectedRowKeys);
    };

    const deleteProductsAndClearSelected = () => {
        dispatch(deleteProducts(selectedProductIds));

        setSelectedProductIds([]);
    }

    const rowSelection = {
        selectedProductIds,
        onChange: onSelectChange,
    };
    const hasSelected = selectedProductIds.length > 0;

    return (
        <AdminLayout redirect={true}>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={deleteProductsAndClearSelected} disabled={!hasSelected}>
                    Видалити
                </Button>

                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Обрано ${selectedProductIds.length} елементів` : ''}
                </span>
            </div>

            <PrintData status={products.status} error={products.error}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={productsList} />
            </PrintData>
        </AdminLayout>
    );
}
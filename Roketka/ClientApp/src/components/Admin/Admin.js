import React, { useEffect, useState } from 'react';
import AdminLayout from './Layout';
import { Table, Button, Tabs, Typography, Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProducts } from '../../features/products/productsSlice';
import { fetchComments, deleteComments } from '../../features/comments/commentsSlice';
import PrintData from '../PrintData';
import AddProductForm from './AddProductForm';

const productColumns = [
    {
        title: "id",
        dataIndex: "id",
        key: "id",
        render: (id) => <a target='_blank' href={"/product/" + id}>{id}</a>
    },
    {
        title: "Назва",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Категорія",
        dataIndex: "section",
        key: "section",
        render: (section) => section.title
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

const commentsColumns = [
    {
        title: "id",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "id користувача",
        dataIndex: "userId",
        key: "userId",
    },
    {
        title: "Товар",
        dataIndex: "product",
        key: "product",
        render: (product) => <a target='_blank' href={'/product/' + product.id}>{product.title}</a> 
    },
    {
        title: "Текст",
        dataIndex: "text",
        key: "text",
    }
];

export default function Admin() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const comments = useSelector(state => state.comments);
    const productsList = products.products.map(product => ({ ...product, key: product.id }));
    const commentsList = comments.comments.map(comment => ({ ...comment, key: comment.id }));
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectedCommentIds, setSelectedCommentIds] = useState([]);

    const [addProductModalVisible, setAddProductModalVisible] = useState(false);
    
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchComments());
    }, [dispatch]);

    const onSelectProductChange = (newSelectedRowKeys) => {
        setSelectedProductIds(newSelectedRowKeys);
    };

    const deleteProductsAndClearSelected = () => {
        dispatch(deleteProducts(selectedProductIds));

        setSelectedProductIds([]);
    }

    const rowProductsSelection = {
        selectedProductIds,
        onChange: onSelectProductChange,
    };
    const hasSelectedProducts = selectedProductIds.length > 0;

    const onSelectCommentChange = (newSelectedRowKeys) => {
        setSelectedCommentIds(newSelectedRowKeys);
    };

    const deleteCommentsAndClearSelected = () => {
        dispatch(deleteComments(selectedCommentIds));

        setSelectedCommentIds([]);
    }

    const rowCommentsSelection = {
        selectedCommentIds,
        onChange: onSelectCommentChange,
    };
    const hasSelectedComments = selectedCommentIds.length > 0;

    const setVisibleAddProductModal = () => {
        setAddProductModalVisible(true);
    };

    const setInvisibleAddProductModal = () => {
        setAddProductModalVisible(false);
    };

    const onFinishAddProductForm = () => {
        setInvisibleAddProductModal();
    };

    const tabItems = [
        {
            key: '1',
            label: 'Товари',
            children: (
                <>
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Button type="primary" onClick={setVisibleAddProductModal}>
                                Додати
                            </Button>

                            <Button type="primary" onClick={deleteProductsAndClearSelected} disabled={!hasSelectedProducts}>
                                Видалити
                            </Button>

                            <span>
                                {hasSelectedProducts ? `Обрано ${selectedProductIds.length} товарів` : ''}
                            </span>
                        </Space>
                    </div>

                    <PrintData status={products.status} error={products.error}>
                        <Table rowSelection={rowProductsSelection} columns={productColumns} dataSource={productsList} />
                    </PrintData>
                </>
            )
        },
        {
            key: '2',
            label: 'Коментарі',
            children: (
                <>
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Button type="primary" onClick={deleteCommentsAndClearSelected} disabled={!hasSelectedComments}>
                                Видалити
                            </Button>

                            <span>
                                {hasSelectedComments ? `Обрано ${selectedCommentIds.length} коментарів` : ''}
                            </span>
                        </Space>
                    </div>

                    <PrintData status={comments.status} error={comments.error}>
                        <Table rowSelection={rowCommentsSelection} columns={commentsColumns} dataSource={commentsList} />
                    </PrintData>
                </>
            )
        }
    ];

    return (
        <AdminLayout redirect={true}>
            <Typography.Title>Адмін-панель</Typography.Title>

            <Tabs defaultActiveKey="1" items={tabItems} />

            <Modal
                open={addProductModalVisible}
                title="Додавання нового товару"
                onCancel={setInvisibleAddProductModal}
                footer={null}
            >
                <AddProductForm onFinishForm={onFinishAddProductForm} products={productsList} />
            </Modal>
        </AdminLayout>
    );
}
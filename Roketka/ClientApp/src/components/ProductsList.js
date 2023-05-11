import React, { useState, useEffect } from 'react';
import { Card, Row, Col, List, Pagination, Typography, Space, Select, Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, sortProductsByPrice } from '../features/products/productsSlice';
import PrintData from './PrintData';

export default function ProductsList(props) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [isCardView, setIsCardView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const currencyName = " грн";

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSegmentedChange = (value) => {
        setIsCardView(value === 'Card');
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    return (
        <PrintData status={products.status} error={products.error}>
            <Row justify="space-between" style={{ marginBottom: 20 }}>
                <Col>
                    <Typography.Text type="secondary">Знайдено елементів: {products.products.length}</Typography.Text>
                </Col>

                <Col>
                    <Space>
                        <Select
                            defaultValue="Сортування"
                            style={{ width: 220 }}
                            onChange={(value) => dispatch(sortProductsByPrice(value))}
                            options={[
                                { value: 'cheap-to-expensive', label: 'Від дешевих до дорогих' },
                                { value: 'expensive-to-cheap', label: 'Від дорогих до дешевих' },
                            ]}
                        />

                        <Segmented
                            options={[
                                {
                                    label: 'Картки',
                                    value: 'Card',
                                    icon: <AppstoreOutlined style={{ position: 'relative', top: '-3px' }} />,
                                },
                                {
                                    label: 'Список',
                                    value: 'List',
                                    icon: <BarsOutlined style={{ position: 'relative', top: '-3px' }} />,
                                },
                            ]}
                            onChange={handleSegmentedChange}
                        />
                    </Space>
                </Col>
            </Row>

            {isCardView ? (
                <Row gutter={[16, 16]}>
                    {products.products
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .map((product) => (
                            <Col span={props.spanCard || 6} key={product.id}>
                                <a href={"/product/" + product.id}>
                                    <Card
                                        hoverable
                                        style={{ width: 340 }}
                                        cover={
                                            (product.images.length > 0) && (<img
                                                alt={product.title}
                                                src={"images/" + product.id + "/" + product.images[0].path} />)
                                        }
                                    >
                                        <Card.Meta title={product.title} description={product.price + currencyName} />
                                    </Card>
                                </a>
                            </Col>
                        ))}
                </Row>
            ) : (
                <List
                    dataSource={products.products
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    renderItem={(product) => (
                        <List.Item key={product.id}>
                            <List.Item.Meta title={<a href={"/product/" + product.id}>{product.title}</a>} description={product.price + currencyName} />
                        </List.Item>
                    )}
                />
            )}

            <Row justify="center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.products.length}
                    onChange={handlePageChange}
                    style={{ marginTop: 20 }}
                />
            </Row>
        </PrintData>
    )
}
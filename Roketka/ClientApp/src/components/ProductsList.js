import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Switch, List, Pagination, Spin, Typography, Space, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, sortProductsByPrice } from '../features/products/productsSlice';

export default function ProductsList(props) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [isCardView, setIsCardView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const currencyName = " грн";

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleSwitchChange = (checked) => {
        setIsCardView(checked);
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    const sortItems = [
        {
            key: '1',
            label: 'Від дешевих до дорогих',
        },
        {
            key: '2',
            label: 'Від дорогих до дешевих',
        },
        {
            key: '3',
            label: 'За замовчуванням',
        }
    ];

    return (
        <>
            {products.status == 'loading' && (
                <>
                    <Row align='center' style={{ margin: '50px 0' }}>
                        <Spin size="large" />
                    </Row>
                </>
            )}

            {products.status == 'failed' && <div>Error: {products.error}</div>}

            {products.status === 'succeeded' && (
                <>
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

                                <Switch
                                    checked={isCardView}
                                    checkedChildren="Картки"
                                    unCheckedChildren="Список"
                                    onChange={handleSwitchChange}
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
                                                cover={<img alt="example" src={product.images[0]} />}
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
                </>
            )}
        </>
    )
}
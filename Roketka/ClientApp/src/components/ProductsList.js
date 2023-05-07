import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Switch, List, Pagination, Space } from 'antd';

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [isCardView, setIsCardView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const currencyName = " грн";

    const handleSwitchChange = (checked) => {
        setIsCardView(checked);
    };

    useEffect(() => {
        fetch("api/Products/GetProducts")
            .then(response => { return response.json() })
            .then(responseJson => {
                setProducts(responseJson)
            });
    }, []);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Row justify="space-between">
                <Col>
                    <p>Знайдено елементів: {products.length}</p>
                </Col>

                <Col>
                    <Switch
                        checked={isCardView}
                        checkedChildren="Картки"
                        unCheckedChildren="Список"
                        onChange={handleSwitchChange}
                    />
                </Col>
            </Row>

            {isCardView ? (
                <div>
                    <Row gutter={[16, 16]}>
                        {products
                            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                            .map((product) => (
                                <Col span={6} key={product.id}>
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
                </div>
            ) : (
                <div>
                    <List
                        dataSource={products
                            .slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                        renderItem={(product) => (
                            <List.Item key={product.id}>
                                <List.Item.Meta title={product.title} description={product.price + currencyName} />
                            </List.Item>
                        )}
                    />
                </div>
            )}

            <Row justify="center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={handlePageChange}
                    style={{ marginTop: 20 }}
                />
            </Row>
        </div>
    )
}
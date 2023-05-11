import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/productsSlice';
import { useEffect } from 'react';
import { Typography, Row, Col, Spin, Button, List, Avatar, Carousel } from 'antd';
import Comments from './Comments';

export default function Product() {
    const id = useParams()["id"];
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.product);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, []);

    return (
        <>
            {status == 'loading' && (
                <>
                    <Row align='center' style={{ margin: '50px 0' }}>
                        <Spin size="large" />
                    </Row>
                </>
            )}

            {status == 'failed' && <div>Error: {error}</div>}

            {status === 'succeeded' && (
                <>
                    <Typography.Title>{product.title}</Typography.Title>

                    <Row gutter={[16]}>
                        <Col span={16}>
                            <Carousel>
                                {product.images.map(item => (
                                    <div key={item.id}>
                                        <img
                                            src={"images/" + product.id + "/" + item.path}
                                            alt={product.title}
                                            style={{ width: '100%', height: 400 }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </Col>

                        <Col span={8}>
                            <p>{product.description}</p>

                            <Typography.Title level={3}>{product.price} грн</Typography.Title>

                            <Button>Купити</Button>
                        </Col>
                    </Row>

                    {product.comments && (
                        <>
                            <Typography.Title level={2} style={{ marginTop: 16 }}>Коментарі</Typography.Title>

                            <Comments productId={product.id} />
                        </>
                    )}
                </>
            )}
        </>
    )
}
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/productsSlice';
import { useEffect } from 'react';
import { Typography, Row, Col, Button, Carousel } from 'antd';
import Comments from './Comments';
import PrintData from './PrintData';
import CarouselDotsStyles from '../styles/CarouselDotsStyles.module.css';

export default function Product() {
    const id = useParams()["id"];
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.product);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    return (
        <PrintData status={status} error={error}>
            {product && (
                <>
                    <Typography.Title>{product.title}</Typography.Title>

                    <Row gutter={[16]}>
                        <Col span={14}>
                            <Carousel
                                dots={{ className: CarouselDotsStyles['carousel-dots'] }}
                                draggable
                            >
                                {product.images.map(item => (
                                    <div key={item.id}>
                                        <img
                                            src={"images/" + product.id + "/" + item.path}
                                            alt={product.title}
                                            style={{ width: '100%', height: 400, objectFit: 'contain' }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </Col>

                        <Col span={10}>
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
        </PrintData>
    )
}
﻿import React from 'react';
import { Row, Col, Layout, Space, Button, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModalVisible, setRegisterModalVisible, exit } from '../features/auth/authSlice';

export default function NavMenu() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <Layout.Header>
            <Row style={{ width: '100%' }} justify={'space-between'}>
                <Col>
                    <div className="logo">Roketka</div>
                </Col>

                <Col>
                    <Space>
                        <a href="/" className="link-white">Головна</a>

                        <a href="/catalog" className="link-white">Каталог</a>

                        <a href="/about" className="link-white">Про нас</a>
                    </Space>
                </Col>

                <Col>
                    {token || isLoggedIn ? (
                        <>
                            <a href="/user">
                                <Space>
                                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                    <div style={{ color: '#fff' }}>User 2</div>
                                </Space>
                            </a>

                            <Button onClick={() => dispatch(exit())}>Вийти</Button>
                        </>
                    ) : (
                        <Space>
                            <Button onClick={() => dispatch(setRegisterModalVisible())}>Зареєструватись</Button>

                            <Button onClick={() => dispatch(setLoginModalVisible())}>Увійти</Button>
                        </Space>
                    )}
                </Col>
            </Row>
        </Layout.Header>
    )
}
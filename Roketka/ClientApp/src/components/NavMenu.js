import React, { useEffect } from 'react';
import { Row, Col, Layout, Space, Button, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModalVisible, setRegisterModalVisible, exit, getUser } from '../features/auth/authSlice';
import AdminLayout from './Admin/Layout';

export default function NavMenu() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

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

                        <AdminLayout>
                            <a href="/admin" className="link-white">Адмін-панель</a>
                        </AdminLayout>
                    </Space>
                </Col>

                <Col>
                    {user ? (
                        <Space>
                            <a href="/user">
                                <Space>
                                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                    <div style={{ color: '#fff' }}>{user.name}</div>
                                </Space>
                            </a>

                            <Button onClick={() => dispatch(exit())}>Вийти</Button>
                        </Space>
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
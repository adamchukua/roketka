import React from 'react';
import { Row, Col, Layout, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setModalVisible as setVisibleRegisterModal } from '../features/register/registerSlice';
import { setModalVisible as setVisibleLoginModal } from '../features/login/loginSlice';

export default function NavMenu() {
    const dispatch = useDispatch();

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
                    <Space>
                        <Button onClick={() => dispatch(setVisibleRegisterModal())}>Зареєструватись</Button>

                        <Button onClick={() => dispatch(setVisibleLoginModal())}>Увійти</Button>
                    </Space>
                </Col>
            </Row>
        </Layout.Header>
    )
}
import React from 'react';
import { Row, Col, Layout, Space, Button } from 'antd';

export default function NavMenu() {
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
                        <Button>Зареєструватись</Button>

                        <Button>Увійти</Button>
                    </Space>
                </Col>
            </Row>
        </Layout.Header>
    )
}
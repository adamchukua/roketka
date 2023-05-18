import React, { useEffect } from 'react';
import { Row, Col, Layout, Space, Button, Avatar, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModalVisible, setRegisterModalVisible, exit, getUser } from '../features/auth/authSlice';
import { searchProducts } from '../features/products/productsSlice';
import AdminLayout from './Admin/Layout';
import NavMenuStyles from '../styles/NavMenu.module.css';
import GeneralStyles from '../styles/general.module.css';

export default function NavMenu() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const shortenText = (text) => {
        if (text.length <= 20) {
            return text;
        } else {
            return text.slice(0, 20) + "...";
        }
    };

    const onSearch = (value) => {
        if (value) {
            dispatch(searchProducts(value));
        }
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <Layout.Header>
            <Row style={{ width: '100%' }} justify={'space-between'} align={'middle'}>
                <Col>
                    <div className={NavMenuStyles.logo}>Roketka</div>
                </Col>

                <Col>
                    <Space>
                        <a href="/" className={GeneralStyles.linkWhite} >Головна</a>

                        <a href="/catalog" className={GeneralStyles.linkWhite}>Каталог</a>

                        <a href="/about" className={GeneralStyles.linkWhite}>Про нас</a>

                        <AdminLayout>
                            <a href="/admin" className={GeneralStyles.linkWhite}>Адмін-панель</a>
                        </AdminLayout>
                    </Space>
                </Col>

                <Col style={{ display: 'flex' }}>
                    <Input.Search
                        placeholder="шукайте тут..."
                        onSearch={onSearch}
                        style={{ width: 200 }} />
                </Col>

                <Col>
                    {user ? (
                        <Space>
                            <a href="/user">
                                <Space>
                                    <Avatar style={{ backgroundColor: '#f56a00' }}>{user.name[0]}</Avatar>
                                    <div style={{ color: '#fff' }}>{shortenText(user.name)}</div>
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
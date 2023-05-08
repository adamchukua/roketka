import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import { ConfigProvider, Button } from 'antd';
import 'antd/dist/reset.css';
import './custom.css';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';

export default function App() {
    return (
        /*<ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#71e18f',
                    colorInfo: '#71e18f'
                },
            }}
        >*/
        <Layout>
                <RegisterModal />
                <LoginModal />

                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        //</ConfigProvider>
    );
}
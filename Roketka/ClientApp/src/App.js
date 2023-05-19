import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import 'antd/dist/reset.css';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';

export default function App() {
    return (
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
    );
}
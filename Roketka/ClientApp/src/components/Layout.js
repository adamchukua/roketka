import React from 'react';
import Footer from './Footer';
import NavMenu from './NavMenu';
import { Layout as AntdLayout } from 'antd';

export default function Layout(props) {
    return (
        <AntdLayout style={{ minHeight: "100vh" }}>
            <NavMenu />

            <AntdLayout className="content">
                {props.children}
            </AntdLayout>

            <Footer/>
        </AntdLayout>
    )
}
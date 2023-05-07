import React from 'react';
import Footer from './Footer';
import NavMenu from './NavMenu';
import { Layout as AntdLayout } from 'antd';

export default function Layout(props) {
    return (
        <AntdLayout>
            <NavMenu />

            <AntdLayout className="content">
                {props.children}
            </AntdLayout>

            <Footer/>
        </AntdLayout>
    )
}
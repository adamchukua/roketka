import React from 'react';
import Footer from './Footer';
import NavMenu from './NavMenu';
import { Layout as AntdLayout } from 'antd';
import GeneralStyles from '../styles/general.module.css';

export default function Layout(props) {
    return (
        <AntdLayout style={{ minHeight: "100vh" }}>
            <NavMenu />

            <AntdLayout className={GeneralStyles.content} >
                {props.children}
            </AntdLayout>

            <Footer/>
        </AntdLayout>
    )
}
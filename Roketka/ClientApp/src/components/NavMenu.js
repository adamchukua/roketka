import React from 'react';
import { Layout, Menu } from 'antd';

export default function NavMenu() {
    const navItems = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    return (
        <Layout.Header>
            <div className="logo">
                <a href="/">Roketka</a>
            </div>

            <Menu
                theme="dark"
                mode="horizontal"
                items={navItems}
            />
        </Layout.Header>
    )
}
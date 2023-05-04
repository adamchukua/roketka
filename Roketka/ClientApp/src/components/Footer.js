import React from 'react';
import { Layout } from 'antd';

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <Layout.Footer style={{ textAlign: 'center' }}>&copy; Roketka {year}. Всі права захищені</Layout.Footer>
    )
}
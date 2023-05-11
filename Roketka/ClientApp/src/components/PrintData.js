import React from 'react';
import { Row, Spin } from 'antd';

const PrintData = ({ status, error, children }) => {
    if (status === 'loading') {
        return (
            <Row align='center' style={{ margin: '50px 0' }}>
                <Spin size="large" />
            </Row>
        );
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    } else {
        return <>{children}</>;
    }
};

export default PrintData;
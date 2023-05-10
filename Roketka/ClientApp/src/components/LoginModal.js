import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginModalInvisible, login } from '../features/auth/authSlice';
import { Modal, Form, Input, Button } from 'antd';

export default function LoginModal() {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.auth.isLoginModalVisible);
    const apiError = useSelector((state) => state.auth.error);

    const onFinish = (values) => {
        dispatch(login(values));
        dispatch(setLoginModalInvisible());
    };

    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            open={isVisible}
            title="Вхід"
            onCancel={() => dispatch(setLoginModalInvisible())}
            footer={null}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Будь ласка введіть пошту!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Будь ласка введіть пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {apiError}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Увійти
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalInvisible, login } from '../features/login/loginSlice';
import { Modal, Form, Input, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function LoginModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isVisible = useSelector((state) => state.login.isModalVisible);
    const apiError = useSelector((state) => state.login.error);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    const onFinish = (values) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/user");
            dispatch(setModalInvisible());
        }
    });

    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            open={isVisible}
            title="Вхід"
            onCancel={() => dispatch(setModalInvisible())}
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

                {isLoggedIn ? "true" : "false"}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Увійти
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
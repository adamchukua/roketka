import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginModalInvisible, login, getUser } from '../features/auth/authSlice';
import { Modal, Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';

export default function LoginModal() {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.auth.isLoginModalVisible);
    const user = useSelector(state => state.auth.user);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const onFinish = async (values) => {
        const responce = await dispatch(login(values));

        if (responce.type !== 'auth/login/rejected') {
            dispatch(setLoginModalInvisible());

            messageApi.open({
                type: 'success',
                content: 'Ви успішно авторизувались',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: 'Користувача з такою поштою та паролем не існує',
            });
        }
    };

    return (
        <>
            {contextHolder}

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
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Будь ласка введіть пошту!' }, { type: 'email', message: 'Будь ласка введіть правильний формат електронної пошти!' }]}
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

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Увійти
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
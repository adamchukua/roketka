import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegisterModalInvisible, register } from '../features/auth/authSlice';
import { Modal, Form, Input, Button, message } from 'antd';

export default function RegisterModal() {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.auth.isRegisterModalVisible);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const validateMessages = {
        required: 'Будь ласка введіть ${label}!',
        types: {
            email: 'Неправильний формат електронної пошти!',
            password: 'Пароль повинен містити не менше 6 символів',
        },
        passwordMismatch: 'Паролі не співпадають',
    };

    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(validateMessages.passwordMismatch));
        },
    });

    const onFinish = async (values) => {
        const responce = await dispatch(register(values));

        if (responce.type !== 'auth/login/rejected') {
            dispatch(setRegisterModalInvisible());

            messageApi.open({
                type: 'success',
                content: 'Ви успішно зареєструвались',
            });

            form.resetFields();
        } else {
            messageApi.open({
                type: 'error',
                content: 'Користувач з такою поштою вже існує',
            });
        }
    };

    return (
        <>
            {contextHolder}

            <Modal
                open={isVisible}
                title="Реєстрація"
                width={600}
                onCancel={() => dispatch(setRegisterModalInvisible())}
                footer={null}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Ім'я"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                min: 6,
                                message: validateMessages.types.password,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Підтвердити пароль"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: validateMessages.required,
                            },
                            validateConfirmPassword,
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Зареєструватися
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
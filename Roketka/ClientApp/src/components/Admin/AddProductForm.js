import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../features/products/productsSlice';
import { fetchSections } from '../../features/sections/sectionsSlice';
import { useEffect } from 'react';

const { Option } = Select;

export default function AddProductForm({ onFinishForm }) {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sections.sections);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchSections());
    }, [dispatch]);

    const onFinish = (values) => {
        dispatch(addProduct(values));

        form.resetFields();
        onFinishForm();
    };

    const validateMessages = {
        required: '${label} - обов\'язкове поле!',
        types: {
            pattern: '${label} - не валідне число!',
        },
    };

    return (
        <Form
            form={form}
            name="productForm"
            initialValues={{
                quantity: 1,
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Назва"
                name="title"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Опис"
                name="description"
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Ціна"
                name="price"
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(/^[0-9]+$/),
                        min: 1,
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                label="Кількість"
                name="quantity"
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(/^[0-9]+$/),
                        min: 1,
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                label="Категорія"
                name="sectionId"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select>
                    {sections.map(section => (
                        <Option value={section.id}>{section.title}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Додати
                </Button>
            </Form.Item>
        </Form>
    );
}
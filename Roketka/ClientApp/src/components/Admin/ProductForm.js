import React, { useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../features/sections/sectionsSlice';

const { Option } = Select;

export default function ProductForm({ onFinish, checkTitle, form, setImageList }) {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sections.sections.filter(section => section.subsectionId !== null));
    const oldProduct = useSelector(state => state.admin.oldProduct);

    useEffect(() => {
        dispatch(fetchSections());
        form.resetFields();
    }, [dispatch, oldProduct]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        setImageList(files);
    };

    const validateMessages = {
        required: '${label} - обов\'язкове поле!',
        types: {
            pattern: '${label} - не валідне число!',
        }
    };

    return (
        <Form
            form={form}
            name="productForm"
            initialValues={{
                title: oldProduct?.title,
                description: oldProduct?.description,
                price: oldProduct?.price,
                price: oldProduct?.price,
                quantity: oldProduct?.quantity || 1,
                sectionId: oldProduct?.sectionId,
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
                    {
                        validator: checkTitle,
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
                <Select name="sectionId">
                    {sections.map(section => (
                        <Option value={section.id} key={section.id}>{section.title}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Зображення" valuePropName="imageList">
                <input type="file" multiple onChange={handleImageChange} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {oldProduct ? "Змінити" : "Додати"}
                </Button>
            </Form.Item>
        </Form>
    );
}
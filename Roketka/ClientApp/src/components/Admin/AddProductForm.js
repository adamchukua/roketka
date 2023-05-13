import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../features/products/productsSlice';
import { fetchSections } from '../../features/sections/sectionsSlice';
import { getUser } from '../../features/auth/authSlice';

const { Option } = Select;

export default function AddProductForm({ onFinishForm }) {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sections.sections);
    const userToken = useSelector(state => state.auth.user.token);
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        dispatch(fetchSections());
        dispatch(getUser());
    }, [dispatch]);

    const onFinish = async (values) => {
        const productData = new FormData();
        productData.append('title', values.title);
        productData.append('description', values.description);
        productData.append('price', values.price);
        productData.append('quantity', values.quantity);
        productData.append('sectionId', values.sectionId);

        const productResponse = await dispatch(addProduct(productData));

        const formData = new FormData();
        for (let i = 0; i < imageList.length; i++) {
            formData.append('files', imageList[i]);
        }
        formData.append('productId', productResponse.payload.id);

        const imagesResponse = await fetch('/api/Images/Upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        });

        if (imagesResponse.ok) {
            message.success('Товар додано!');
            setImageList([]);
            form.resetFields();
            onFinishForm();
        } else {
            message.error('Помилка!');
        }
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        setImageList(files);
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
                        <Option value={section.id} key={section.id}>{section.title}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Зображення" valuePropName="imageList">
                <input type="file" multiple onChange={handleImageChange} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Додати
                </Button>
            </Form.Item>
        </Form>
    );
}
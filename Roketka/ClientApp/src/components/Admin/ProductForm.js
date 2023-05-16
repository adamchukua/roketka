import React, { useEffect } from 'react';
import { Form, Input, Select, Button, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../features/sections/sectionsSlice';
import PrintData from '../PrintData';

const { Option } = Select;

export default function ProductForm({ onFinish, checkTitle, form, setImageList, deleteImage, oldProduct, loadedImages }) {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sections.sections.filter(section => section.subsectionId !== null));

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
            onFinishFailed={(errorInfo) => {
                console.log('Failed:', errorInfo);
            }}
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
                {oldProduct && (
                    <List
                        itemLayout="horizontal"
                        dataSource={loadedImages}
                        renderItem={(image) => (
                            <List.Item
                                key={image.id}
                                actions={[<DeleteOutlined key={image.id} onClick={() => deleteImage(image.id)} />]}
                            >
                                <List.Item.Meta title={image.path} action={"ad"} />
                            </List.Item>
                        )}
                    />
                )}

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
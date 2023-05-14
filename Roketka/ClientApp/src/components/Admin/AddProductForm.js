import React, { useEffect, useState } from 'react';
import { message, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm';
import { addProduct } from '../../features/products/productsSlice';
import { getUser } from '../../features/auth/authSlice';
import { setOldProduct} from '../../features/admin/adminSlice';

export default function AddProductForm({ onFinishForm, products }) {
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.auth.user.token);
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);

    dispatch(setOldProduct(null));

    useEffect(() => {
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

    const checkTitle = async (rule, value) => {
        const exists = products.some(product => product.title === value);
        if (exists) {
            throw new Error('Така назва вже існує!');
        }
    };

    return (
        <ProductForm
            onFinish={onFinish}
            checkTitle={checkTitle}
            form={form}
            setImageList={setImageList}
        />
    );
}
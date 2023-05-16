import React, { useState } from 'react';
import { message, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm';
import { addProduct } from '../../features/products/productsSlice';
import { addImages } from '../../features/images/imagesSlice';

export default function AddProductForm({ onFinishForm, products }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);
    const productsState = useSelector(state => state.products);

    const onFinish = async (values) => {
        const productData = new FormData();
        const imagesData = new FormData();

        productData.append('title', values.title);
        productData.append('description', values.description);
        productData.append('price', values.price);
        productData.append('quantity', values.quantity);
        productData.append('sectionId', values.sectionId);

        for (let i = 0; i < imageList.length; i++) {
            imagesData.append('files', imageList[i]);
        }

        const productResponse = await dispatch(addProduct(productData));
        if (productsState.status === 'failed') {
            message.error('Помилка додавання товару!');
            return;
        }

        imagesData.append('productId', productResponse.payload.id);
       
        const imagesResponse = await dispatch(addImages(imagesData));

        if (imagesResponse.meta.requestStatus === 'fulfilled' &&
            productResponse.meta.requestStatus === 'fulfilled') {
            message.success('Товар та зображення додано!');
            setImageList([]);
            form.resetFields();
            onFinishForm();
        } else {
            message.error('Помилка!');
        }
    };

    const checkTitle = (rule, value) => {
        const exists = products.some(product => product.title === value);
        if (exists) {
            return Promise.reject('Така назва вже існує!')
        }

        return Promise.resolve();
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
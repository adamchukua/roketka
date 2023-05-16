import React, { useState } from 'react';
import { message, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm';
import { updateProduct } from '../../features/products/productsSlice';
import { deleteImage as deleteImageRequest, addImages } from '../../features/images/imagesSlice';

export default function EditProductForm({ onFinishForm, products }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);
    const oldProduct = useSelector(state => state.admin.oldProduct);
    const loadedImages = useSelector(state => state.images.images);

    const onFinish = async (values) => {
        const productData = new FormData();
        const imagesData = new FormData();

        productData.append('id', oldProduct.id);
        productData.append('title', values.title);
        productData.append('description', values.description);
        productData.append('price', values.price);
        productData.append('quantity', values.quantity);
        productData.append('sectionId', values.sectionId);

        const productResponse = await dispatch(updateProduct(productData));

        for (let i = 0; i < imageList.length; i++) {
            imagesData.append('files', imageList[i]);
        }
        imagesData.append('productId', productResponse.payload.id);

        const imagesResponse = await dispatch(addImages(imagesData));

        if (imagesResponse.meta.requestStatus === 'fulfilled') {
            message.success('Товар оновлено!');
            setImageList([]);
            form.resetFields();
            onFinishForm();
        } else {
            message.error('Помилка!');
        }
    };

    const checkTitle = async (rule, value) => {
        const exists = products
            .filter(product => product.id !== oldProduct.id)
            .some(product => product.title === value);
        if (exists) {
            throw new Error('Така назва вже існує!');
        }
    };

    const deleteImage = async (imageId) => {
        const deleteImageResponse = await dispatch(deleteImageRequest(imageId));

        if (deleteImageResponse.meta.requestStatus === 'fulfilled') {
            message.success('Зображення видалено!');
        } else {
            message.error('Помилка видалення зображення!');
        }
    };

    return (
        <ProductForm
            onFinish={onFinish}
            checkTitle={checkTitle}
            form={form}
            setImageList={setImageList}
            deleteImage={deleteImage}
            oldProduct={oldProduct}
            loadedImages={loadedImages}
        />
    );
}
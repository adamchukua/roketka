import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, List, Avatar, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentsByProductId, addComment, deleteComment } from '../features/comments/commentsSlice';
import { getUser } from '../features/auth/authSlice';
import PrintData from './PrintData';

export default function Comments({ productId }) {
    const user = useSelector(state => state.auth.user);
    const comments = useSelector(state => state.comments.comments);
    const status = useSelector(state => state.comments.status);
    const error = useSelector(state => state.comments.error);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommentsByProductId(productId));
    }, []);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    const onFinish = (values) => {
        const text = values.text;

        dispatch(addComment({ productId, text } ));

        form.resetFields();
    };

    return (
        <>
            {user && (
                <Form form={form} layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Будь ласка введіть коментар!',
                            },
                        ]}
                    >
                        <Input placeholder="Ваш коментар..." />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Додати коментар
                        </Button>
                    </Form.Item>
                </Form>
            )}

            <PrintData status={status} error={error}>
                <List
                    itemLayout="horizontal"
                    dataSource={comments.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    renderItem={(comment, index) => (
                        <List.Item
                            key={index}
                            actions={user && user.id === comment.user.id && [
                                <Button
                                    type="link"
                                    icon={<EditOutlined />}
                                    onClick={() => alert(comment)}
                                />,
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    onClick={() => dispatch(deleteComment(comment.id))}
                                />
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{comment.user.name[0]}</Avatar>}
                                title={comment.user.name}
                                description={comment.text}
                            />
                        </List.Item>
                    )}
                />

                <Row justify="center">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={comments.length}
                        onChange={handlePageChange}
                        style={{ marginTop: 20 }}
                    />
                </Row>
            </PrintData>
        </>
    );
};

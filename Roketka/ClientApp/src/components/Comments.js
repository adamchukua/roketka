import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Spin, List, Avatar, Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentsByProductId, addComment } from '../features/comments/commentsSlice';
import { getUser } from '../features/auth/authSlice';

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

            {status == 'loading' && (
                <>
                    <Row align='center' style={{ margin: '50px 0' }}>
                        <Spin size="large" />
                    </Row>
                </>
            )}

            {status == 'failed' && <div>Error: {error}</div>}

            {status === 'succeeded' && (
                <>
                    <List
                        itemLayout="horizontal"
                        dataSource={comments.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                        renderItem={(comment, index) => (
                            <List.Item key={index}>
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
                </>
            )}
        </>
    );
};

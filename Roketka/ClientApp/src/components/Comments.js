import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Spin, List, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentsByProductId } from '../features/comments/commentsSlice';

export default function Comments({ productId }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const comments = useSelector(state => state.comments.comments);
    const status = useSelector(state => state.comments.status);
    const error = useSelector(state => state.comments.error);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommentsByProductId(productId));
    }, []);

    const onFinish = (values) => {
        //addComment(productId, values.text);

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
                <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={(comment, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{comment.user.name[0]}</Avatar>}
                                title={comment.user.name}
                                description={comment.text}
                            />
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

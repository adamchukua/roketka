import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../features/auth/authSlice';

export default function Admin({ redirect, children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (user && !user.isAdmin && redirect) {
        navigate('/');
    }

    return (
        <>
            {user && user.isAdmin && (
                <>
                    {children}
                </>
            )}
        </>
    );
}

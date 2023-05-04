import React from 'react';
import Footer from './Footer';
import NavMenu from './NavMenu';

export default function Layout(props) {
    return (
        <div>
            <NavMenu />

            <div tag="main">
                {props.children}
            </div>

            <Footer/>
        </div>
    )
}
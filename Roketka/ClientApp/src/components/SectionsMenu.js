import React, { useEffect, useState } from 'react';
import { Menu, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../features/sections/sectionsSlice';
import { filterProductsBySubsection } from '../features/products/productsSlice';

const { SubMenu } = Menu;

const SectionsMenu = () => {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.sections.sections);
    const status = useSelector(state => state.sections.status);
    const error = useSelector(state => state.sections.error);

    useEffect(() => {
        dispatch(fetchSections());
    }, []);

    const renderSubMenu = (subsections, section) => {
        return (
            <SubMenu key={section.id} title={section.title}>
                {subsections.map((subsec) => (
                    <Menu.Item
                        key={subsec.id}
                        onClick={() => dispatch(filterProductsBySubsection(subsec.id))}
                    >
                        {subsec.title}
                    </Menu.Item>
                ))}
            </SubMenu>
        );
    };

    return (
        <>
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
                    <Menu mode="inline">
                        {sections.map((section) => {
                            const subsections = sections.filter((subsec) => subsec.subsectionId === section.id);

                            if (subsections.length > 0) {
                                return renderSubMenu(subsections, section);
                            }

                            if (section.subsectionId == null) {
                                return <Menu.Item key={section.id}>{section.title}</Menu.Item>;
                            }
                        })}
                    </Menu>
                </>
            )}
        </>
    );
};

export default SectionsMenu;

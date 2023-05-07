import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../features/sections/sectionsSlice';
import { filterProductsBySubsection } from '../features/products/productsSlice';

const { SubMenu } = Menu;

const SectionsMenu = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.sections);

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
        <Menu mode="inline">
            {sections.sections.map((section) => {
                const subsections = sections.sections.filter((subsec) => subsec.subsectionId === section.id);

                if (subsections.length > 0) {
                    return renderSubMenu(subsections, section);
                }

                if (section.subsectionId == null) {
                    return <Menu.Item key={section.id}>{section.title}</Menu.Item>;
                }
            })}
        </Menu>
    );
};

export default SectionsMenu;

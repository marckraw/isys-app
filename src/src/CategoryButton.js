import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import deleteIcon from './delete.svg';
import editIcon from './edit.svg';

const CategoryButtonWrapper = styled.div`
    display: inline-block;
    margin: 10px;
    background-color: #eee;
`;

const GotoButton = styled.button`
    display: inline-block;
    padding: 25px 30px;
    background-color: #eee;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

const RemoveButton = styled.button`
    display: inline-block;
    padding: 25px 20px;
    background-color: #eee;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

const EditButton = styled.button`
    display: inline-block;
    padding: 25px 20px;
    background-color: #eee;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

const CategoryButton = ({ changeCategory, removeCategory, editCategory, category }) => (
    <CategoryButtonWrapper>
        <GotoButton
            onClick={changeCategory}
            value={category.id}
            style={category.is_visible ? {color: 'black'} : {color: 'gray'}}>
            { category.name } { category.parent_id } : { category.id }
        </GotoButton>
        <EditButton
            onClick={editCategory}
            value={category.id}>
                <img width="12" src={editIcon} className="App-logo" alt="logo" />
        </EditButton>
        <RemoveButton
            onClick={removeCategory}
            value={category.id}>
                <img width="12" src={deleteIcon} className="App-logo" alt="logo" />
        </RemoveButton>
    </CategoryButtonWrapper>
);

CategoryButton.propTypes = {
    changeCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
};

export default CategoryButton
